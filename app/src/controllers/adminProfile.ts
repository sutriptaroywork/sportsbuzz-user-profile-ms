// external packages
import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';

// services
import AdminProfileService from '@/src/services/admin/adminProfile';
import CommonService from '@/src/services/common';
import StatisticsService from '@/src/services/statistics/statistics';
import CitiesService from '@/src/services/statistics/cities';
import AdminLogsService from '@/src/services/admin/adminLogs';
import UserLeagueService from '@/src/services/game/userLeague';
import SeriesLBUserRankService from '@/src/services/seriesLB/seriesLBUserRank';

// enums
import { HTTPStatus } from '@/enums/statusType/statusCommon';
import { messages } from '@/enums/messageTypeEnums/general';

// interfaces
import { AdminRefferedQuery } from '@/interfaces/admin/adminProfile';

// helpers
import { catchError, queryToGetAdminList, defaultSearch, getPaginationValues, pick, projectionFields, validatePIN, getIp } from '@/helpers/utility';

// constants
import Constants from '@/configs/constants';

// Queues
import AdminLogQueue from '@/connections/rabbitmq/queue/adminLogs';

export default class AdminProfileController {
  private adminProfileService: AdminProfileService;
  private commonService: CommonService;
  private statisticsService: StatisticsService;
  private citiesService: CitiesService;
  private adminLogsService: AdminLogsService;
  private userLeagueService: UserLeagueService;
  private seriesLBUserRankService: SeriesLBUserRankService;

  constructor() {
    this.adminProfileService = new AdminProfileService();
    this.commonService = new CommonService();
    this.statisticsService = new StatisticsService();
    this.citiesService = new CitiesService();
    this.adminLogsService = new AdminLogsService();
    this.userLeagueService = new UserLeagueService();
    this.seriesLBUserRankService = new SeriesLBUserRankService();
  }

  public getProfileDetailsV2 = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      const adminDetails = JSON.parse((req.headers.admin) as string)
      const { order, datefrom, dateto } = req.query
      const isFullResponse = (req.query.isFullResponse) as string
      const start = req.query.start ? (req.query.start) as string: 0
      const limit = req.query.limit ? (req.query.limit) as string: 10

      if (isFullResponse === 'true') {
        if (!datefrom || !dateto) {
          return res.status(HTTPStatus.BAD_REQUEST).jsonp({ status: HTTPStatus.BAD_REQUEST, error: messages[userLanguage].date_filter_err })
        }
      }

      const orderBy = order && order === 'asc' ? 1 : -1
      const sorting = { dCreatedAt: orderBy }

      const query = queryToGetAdminList(req)

      const outputFields = {
        sName: 1,
        sUsername: 1,
        sEmail: 1,
        sMobNum: 1,
        bIsEmailVerified: 1,
        bIsMobVerified: 1,
        sProPic: 1,
        eType: 1,
        eGender: 1,
        eStatus: 1,
        iReferredBy: 1,
        sReferCode: 1,
        iStateId: 1,
        dDob: 1,
        iCountryId: 1,
        iCityId: 1,
        sAddress: 1,
        nPinCode: 1,
        dLoginAt: 1,
        dPasswordchangeAt: 1,
        dCreatedAt: 1,
        bIsInternalAccount: 1,
        ePlatform: 1
      }
      let usersList
      if ([true, 'true'].includes(isFullResponse)) {
        usersList = await this.adminProfileService.findUserListWithSorting(query, outputFields, sorting)
      } else {
        usersList = await this.adminProfileService.findUserListWithSortingSkippingLimiting(query, outputFields, sorting, start, limit)
      }

      if (usersList.length && adminDetails.eType !== 'SUPER') {
        usersList.forEach(eachUser => {
          eachUser.sMobNum = (eachUser.sMobNum && eachUser.sMobNum.trim())
          eachUser.sEmail = (eachUser.sEmail && eachUser.sEmail.trim())
        })
      }

      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].cusers), data: { results: usersList } })
    } catch (error) {
      return catchError('Admin.get.v2', error, req, res)
    }
  };

  public getAdminCount = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'

      const query = queryToGetAdminList(req)

      const count = await this.adminProfileService.countAdminUser({ ...query })

      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', `${messages[userLanguage].cusers} ${messages[userLanguage].cCounts}`), data: { count } })
    } catch (error) {
      return catchError('Admin.getAdminCount', error, req, res)
    }
  };

  public getUserRecommendation = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      const sSearch = req.query.sSearch ? defaultSearch(req.query.sSearch) : ''
      const nLimit = req.query.nLimit ? parseInt(req.query.nLimit as string) : 10

      const sValue = { $regex: new RegExp('^.*' + sSearch + '.*', 'i') }
      const query = { $or: [{ sName: sValue }, { sUsername: sValue }, { sEmail: sValue }, { sMobNum: sValue }] }

      const data = await this.adminProfileService.findUserListWithSortingSkippingLimiting(query, { _id: 1, sName: 1, sEmail: 1, sUsername: 1, sMobNum: 1 }, {}, 0, nLimit)
      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].cRecommendedUsers), data })
    } catch (error) {
      return catchError('Admin.getUserRecommendation', error, req, res)
    }
  }

  public getAdminDetailsById = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      const user = await this.adminProfileService.findOneByQuery({ _id: new ObjectId(req.params.id), eType: 'U' })
      if (!user) return res.status(HTTPStatus.NOT_FOUND).jsonp({ status: HTTPStatus.NOT_FOUND, error: messages[userLanguage].not_exist.replace('##', messages[userLanguage].cprofile) })

      this.commonService.removeUnnecessaryFields(user)

      const statistics = await this.statisticsService.getStatisticsByUserId({ iUserId: new ObjectId(req.params.id) }, { nReferrals: 1, _id: 0 })

      const data = { ...user, ...statistics }

      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].cprofile), data })
    } catch (error) {
      return catchError('Admin.getAdminDetailsById', error, req, res)
    }
  }

  public referredByUserList = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      let { order, search } = req.query
      const sort = req.query.sort ? req.query.sort as string : 'dCreatedAt'
      const start = req.query.start ? (req.query.start) as string: 0
      const limit = req.query.limit ? (req.query.limit) as string: 10

      const orderBy = order && order === 'asc' ? 1 : -1

      const sorting = { [sort]: orderBy }

      if (search) search = defaultSearch(search)

      let query: AdminRefferedQuery = { iReferredBy: new ObjectId(req.params.id) }
      if (search && search.length) {
        query = {
          ...query,
          $or: [
            { sUsername: { $regex: new RegExp('^.*' + search + '.*', 'i') } },
            { sEmail: { $regex: new RegExp('^.*' + search + '.*', 'i') } },
            { sMobNum: { $regex: new RegExp('^.*' + search + '.*', 'i') } }
          ]
        }
      }

      const outputFields = {
        sName: 1,
        sUsername: 1,
        sEmail: 1,
        sMobNum: 1,
        bIsEmailVerified: 1,
        bIsMobVerified: 1,
        sProPic: 1,
        eType: 1,
        eGender: 1,
        eStatus: 1,
        iReferredBy: 1,
        sReferCode: 1,
        iStateId: 1,
        dDob: 1,
        iCountryId: 1,
        iCityId: 1,
        sAddress: 1,
        nPinCode: 1,
        dLoginAt: 1,
        dPasswordchangeAt: 1,
        dCreatedAt: 1,
        bIsInternalAccount: 1
      }

      const [usersList, count] = await Promise.all([
        this.adminProfileService.findUserListWithSortingSkippingLimiting(query, outputFields, sorting, start, limit),
        this.adminProfileService.countAdminUser({ ...query })
      ])

      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].referredUsers), data: { results: usersList, count } })
    } catch (error) {
      return catchError('Admin.referredByUserList', error, req, res)
    }
  }

  public getCitiesList = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      const { start, limit } = getPaginationValues(req.query)
      const { nStateId } = req.query;

      const citiesList = await this.citiesService.getCitiesListByStateForAdmin(Number(nStateId), Number(start), Number(limit))
      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].cUsersCity), data: citiesList })
    } catch (error) {
      return catchError('Admin.getCitiesList', error, req, res)
    }
  }

  public updateProfile = async (req: Request, res: Response) => {
    try {
      const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
      const adminDetails = JSON.parse((req.headers.admin) as string)
      const { sEmail, sMobNum, eStatus, sProPic, sUsername, nPinCode, eGender } = req.body
      req.body = pick(req.body, ['sName', 'eGender', 'eStatus', 'sReferCode', 'dDob', 'sAddress', 'nPinCode', 'sEmail', 'sMobNum', 'bIsInternalAccount', 'iCityId', 'iStateId', 'iCountryId', 'sUsername'])
      const projection = projectionFields(req.body)
      const iUserId = req.params.id

      const oOldFields = await this.adminProfileService.findOneWithSelectedFields({ _id: new ObjectId(iUserId) }, { ...projection, aJwtTokens: 1, _id: 0 })
      if (!oOldFields) return res.status(HTTPStatus.NOT_FOUND).jsonp({ status: HTTPStatus.NOT_FOUND, error: messages[userLanguage].not_exist.replace('##', messages[userLanguage].cuserProfile) })

      if (eStatus && eStatus === 'N') {
        const { aJwtTokens } = oOldFields
        for (const token of aJwtTokens) {
          const { sToken } = token
          await this.adminProfileService.findOneAndUpdateNoUpsert({ _id: new ObjectId(iUserId) }, { $pull: { aJwtTokens: { sToken } } })
          this.commonService.tokenBlacklisting(sToken)
          this.commonService.clearCache(`at:${sToken}`)
        }
      }

      if (eGender && !(Constants.userGender.includes(eGender))) { return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).jsonp({ status: HTTPStatus.UNPROCESSABLE_ENTITY, error: messages[userLanguage].invalid.replace('##', messages[userLanguage].cGender) }) }

      if (nPinCode && !validatePIN(nPinCode)) return res.status(HTTPStatus.BAD_REQUEST).jsonp({ status: HTTPStatus.BAD_REQUEST, error: messages[userLanguage].invalid.replace('##', messages[userLanguage].cPin) })

      const { _id: iAdminId } = adminDetails
      const checkingArr = []
      if (sUsername) { checkingArr.push({ sUsername }) }
      if (sEmail) { checkingArr.push({ sEmail }) }
      if (sMobNum) { checkingArr.push({ sMobNum }) }
      const userExist = await this.adminProfileService.findOneByQuery({ $or: checkingArr, _id: { $ne: new ObjectId(iUserId) } })
      if (userExist) {
        if (userExist.sMobNum === sMobNum) return res.status(HTTPStatus.RESOURCE_EXIST).jsonp({ status: HTTPStatus.RESOURCE_EXIST, error: messages[userLanguage].already_exist.replace('##', messages[userLanguage].mobileNumber) })
        if (userExist.sEmail && userExist.sEmail === sEmail) return res.status(HTTPStatus.RESOURCE_EXIST).jsonp({ status: HTTPStatus.RESOURCE_EXIST, error: messages[userLanguage].already_exist.replace('##', messages[userLanguage].email) })
        if (userExist.sUsername === sUsername) return res.status(HTTPStatus.RESOURCE_EXIST).jsonp({ status: HTTPStatus.RESOURCE_EXIST, error: messages[userLanguage].already_exist.replace('##', messages[userLanguage].username) })

        if (userExist.sEmail !== sEmail) req.body.bIsEmailVerified = true
        if (userExist.sMobNum !== sMobNum) req.body.bIsMobVerified = true
      }
      const user = await this.adminProfileService.findOneAndUpdateNoUpsert(new ObjectId(iUserId), { ...req.body, sProPic })

      const oNewFields = { ...req.body }
      oOldFields.aJwtTokens = undefined
      const logData = { oOldFields, oNewFields, sIP: getIp(req), iAdminId: new ObjectId(iAdminId), iUserId: new ObjectId(iUserId), eKey: 'P' }
      // try {
        // await this.adminLogsService.createLog(logData)
      // } catch (error) {
      //   return catchError('AdminLog.create', error, req, res)
      // }
      AdminLogQueue.publish(logData)

      this.commonService.removeUnnecessaryFields(user)

      if (sProPic && sProPic.length) {
        this.userLeagueService.updateMultiple({ iUserId: new ObjectId(user._id) }, { $set: { sProPic: user.sProPic } })
        this.seriesLBUserRankService.updateMultiple({ iUserId: new ObjectId(user._id) }, { $set: { sProPic: user.sProPic } })
      }

      return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].update_success.replace('##', messages[userLanguage].user), data: user })
    } catch (error) {
      return catchError('Admin.updateProfile', error, req, res)
    }
  }
}
