// external packages
import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';

// DTOs
import { UserProfileUpdateResponseDto, UserProfileResponseDto } from '@/src/dtos/userProfile/userResponse';

// services
import AccountService from '@/src/services/userProfile/account';
import UserProfileService from '@/src/services/userProfile/userProfile';
import UserBalanceService from '@/src/services/userProfile/userBalance';
import CommonRuleService from '@/src/services/statistics/commonRule';
import StatesService from '@/src/services/statistics/states';
import CitiesService from '@/src/services/statistics/cities';
import MyMatchesService from '@/src/services/game/myMatches';
import StatisticsService from '@/src/services/statistics/statistics';
import UserLeagueService from '@/src/services/game/userLeague';
import SeriesLBUserRankService from '@/src/services/seriesLB/seriesLBUserRank';
import CommonService from '@/src/services/common';

// enums
import { HTTPStatus } from '@/enums/statusType/statusCommon';
import { messages } from '@/enums/messageTypeEnums/general';

// interfaces
import { UserFromRequest } from '@/interfaces/userProfile/userProfile';

// helpers
import { catchError, pick, validatePIN } from '@/helpers/utility';

// constants
import Constants from '@/configs/constants';

export default class UserProfileController {
  private userProfileService: UserProfileService;
  private userBalanceService: UserBalanceService;
  private commonRuleService: CommonRuleService;
  private accountService: AccountService;
  private statesService: StatesService;
  private citiesService: CitiesService;
  private myMatchesService: MyMatchesService;
  private statisticsService: StatisticsService;
  private userLeagueService: UserLeagueService;
  private seriesLBUserRankService: SeriesLBUserRankService;
  private commonService: CommonService;

  constructor() {
    this.userProfileService = new UserProfileService();
    this.userBalanceService = new UserBalanceService();
    this.commonRuleService = new CommonRuleService();
    this.accountService = new AccountService();
    this.statesService = new StatesService();
    this.citiesService = new CitiesService();
    this.myMatchesService = new MyMatchesService();
    this.statisticsService = new StatisticsService();
    this.userLeagueService = new UserLeagueService();
    this.seriesLBUserRankService = new SeriesLBUserRankService();
    this.commonService = new CommonService();
  }

  public getProfileDetailsV2 = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      const reqUser: UserFromRequest = JSON.parse((req.headers.user) as string)

      const user =  await this.userProfileService.getUserProfileDetails(new ObjectId(reqUser._id))
      if (!user) return res.status(HTTPStatus.UNAUTHORIZED).jsonp({ status: HTTPStatus.UNAUTHORIZED, error: messages[userLanguage].err_unauthorized })

      const userBalance = await this.userBalanceService.getUserBalanceByUserId(user._id.toString())

      const llc = await this.commonRuleService.getRuleDetails('LCC')
      const nLeagueCreatorCom = llc ? llc.nAmount : undefined

      if (!userBalance) {
        const openAccount = await this.accountService.openAccount({ iUserId: user._id.toString(), sUsername: user.sUsername, eUserType: user.eType })
        if (openAccount.isSuccess === false) {
          return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].user), data: { ...user, nLeagueCreatorCom, id: undefined, iUserId: undefined } })
        }
      }
      // UserModel.filterData(user)

      const userBalanceUpdated = await this.userBalanceService.getUserBalanceByUserId(user._id.toString());
      userBalanceUpdated.eUserType = undefined;

      const responseObj = { ...user, ...userBalanceUpdated, nLeagueCreatorCom, id: undefined, iUserId: undefined }
      const returnData = UserProfileResponseDto.parse(responseObj)
      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].user), data: returnData })
    } catch (error) {
        return catchError('Users.get.v2', error, req, res)
    }
  };

  public getStatistic = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      const reqUser: UserFromRequest = JSON.parse((req.headers.user) as string)

      const [aTotalJoinLeague, nTotalMatch, userStatistics] = await Promise.all([
          this.myMatchesService.getTotalJoinedLeague(new ObjectId(reqUser._id)),
          this.myMatchesService.getTotalMatches({ iUserId: new ObjectId(reqUser._id), 'aMatchLeagueId.0': { $exists: true } }),
          this.statisticsService.getStatisticsByUserId({ iUserId: new ObjectId(reqUser._id) }, { nTotalWinnings: 1, _id: 0 })
      ])
      const nTotalJoinLeague = aTotalJoinLeague.length ? aTotalJoinLeague.reduce((sum, { count }) => (sum + count), 0) : 0

      if (!userStatistics) return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].user) })
      const statistic = { ...userStatistics, nTotalJoinLeague, nTotalMatch }

      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].user), data: { ...statistic } })
    } catch (error) {
      return catchError('Users.getStatistic', error, req, res)
    }
  }

  public getCitiesList = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      const { nStateId } = req.query;

      const cities = await this.citiesService.getCitiesListByState({ nStateId: Number(nStateId) }, { sName: 1, _id: 0 })
      if (!cities || (Array.isArray(cities) && cities.length === 0)) return res.status(HTTPStatus.NOT_FOUND).jsonp({ status: HTTPStatus.NOT_FOUND, error: messages[userLanguage].not_exist.replace('##', messages[userLanguage].cUsersCity) })

      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].cUsersCity), data: cities })
    } catch (error) {
      return catchError('Users.cities.get', error, req, res)
    }
  }

  public updateProfile = async(req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      const reqUser: UserFromRequest = JSON.parse((req.headers.user) as string)

      const { sProPic, nPinCode, eGender } = req.body
      const kycApproval = await this.userProfileService.kycApprovalCount({ _id: new ObjectId(reqUser._id), bIsKycApproved: true })

      let updateObject = pick(req.body, ['sName', 'eGender', 'sProPic', 'dDob', 'sAddress', 'nPinCode', 'iCityId', 'iStateId', 'iCountryId'])
      if (kycApproval) {
        updateObject = pick(req.body, ['sAddress', 'nPinCode', 'sProPic', 'iCityId', 'sEmail'])
      }
      if (eGender && !(Constants.userGender.includes(eGender))) { return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).jsonp({ status: HTTPStatus.UNPROCESSABLE_ENTITY, error: messages[userLanguage].invalid.replace('##', messages[userLanguage].cGender) }) }

      if (nPinCode && !validatePIN(nPinCode)) return res.status(HTTPStatus.BAD_REQUEST).jsonp({ status: HTTPStatus.BAD_REQUEST, error: messages[userLanguage].invalid.replace('##', messages[userLanguage].cPin) })

      const user = await this.userProfileService.findByIdAndUpdate(new ObjectId(reqUser._id), { $set: { ...updateObject } })
      this.commonService.removeUnnecessaryFields(user)

      if (sProPic && sProPic.length) {
        this.userLeagueService.updateMultiple({ iUserId: new ObjectId(user._id) }, { $set: { sProPic: user.sProPic } })
        this.seriesLBUserRankService.updateMultiple({ iUserId: new ObjectId(user._id) }, { $set: { sProPic: user.sProPic } })
      }

      const returnData = UserProfileUpdateResponseDto.parse(user)
      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].update_success.replace('##', messages[userLanguage].cprofile), data: returnData })
    } catch (error) {
      return catchError('Users.update', error, req, res)
    }
  }
}
