import { Schema } from 'mongoose';

import { GameDBConnect } from '@/connections/database/mongodb/mongodb';
import { UserLeagueAttributes } from '@/interfaces/game/userLeague';
import Constants from '@/configs/constants';

import MatchModel from '../match/match';
import UserModel from '../userProfile/userProfile';
import MatchLeagueModel from './matchLeague';
import UserTeamModel from '../fantasyTeam/userTeam';
import PromocodeModel from '../league/promocode';

import { userTypeForJoinLeague } from '@/enums/userProfileType/userCommon';
import { MatchCategory } from '@/enums/matchType/matchCommon';
import { PlatformType } from '@/enums/platformType/platformCommon';

export interface UserLeagueModelInput extends Omit<UserLeagueAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface UserLeagueModelOutput extends Required<UserLeagueAttributes> {}

const UserLeagueSchema = new Schema<UserLeagueAttributes>(
    {
        iUserTeamId: { type: Schema.Types.ObjectId, ref: UserTeamModel },
        iUserId: { type: Schema.Types.ObjectId, ref: UserModel },
        iMatchLeagueId: { type: Schema.Types.ObjectId, ref: MatchLeagueModel },
        iMatchId: { type: Schema.Types.ObjectId, ref: MatchModel },
        nTotalPayout: { type: Number },
        nPoolPrice: { type: Boolean, default: false },
        nTotalPoints: { type: Number },
        sPayoutBreakupDesign: { type: String },
        nRank: { type: Number },
        nPrice: { type: Number }, // Real Money win
        aExtraWin: [{
            sInfo: { type: String },
            sImage: { type: String, trim: true }
        }],
        nBonusWin: { type: Number, default: 0 }, // Bonus win
        sUserName: { type: String, trim: true },
        eType: { type: String, enum: Constants.user.userTypeForJoinLeague, default: userTypeForJoinLeague.USER }, // U = USER B = BOT CB = COPY BOT, CMB = COMBINATION BOT
        sProPic: { type: String, trim: true },
        sTeamName: { type: String, trim: true, default: 'T1' },
        sMatchName: { type: String, trim: true },
        sLeagueName: { type: String, trim: true },
        ePlatform: { type: String, enum: Constants.platform, required: true, default: PlatformType.OTHER }, // A = Android, I = iOS, W = Web, O = Other, AD = Admin
        iPromocodeId: { type: Schema.Types.ObjectId, ref: PromocodeModel },
        nPromoDiscount: { type: Number },
        nOriginalPrice: { type: Number },
        nPricePaid: { type: Number },
        actualCashUsed: { type: Number },
        actualBonusUsed: { type: Number },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        bPointCalculated: { type: Boolean, default: false },
        bRankCalculated: { type: Boolean, default: false },
        bPrizeCalculated: { type: Boolean, default: false },
        bWinDistributed: { type: Boolean, default: false },
        sExternalId: { type: String },
        bCancelled: { type: Boolean, default: false },
        bSwapped: { type: Boolean, default: false }, // it's true when combination bot replaced with copy bot userLeague and vice versa.
        bIsDuplicated: { type: Boolean, default: false },
        bAfterMinJoin: { type: Boolean, default: false }
    },
    { timestamps: { createdAt: Constants.tableDetails.userLeague.createdAtFieldName, updatedAt: Constants.tableDetails.userLeague.updatedAtFieldName } }
);

UserLeagueSchema.index({ iMatchId: 1, iUserId: 1, iMatchLeagueId: 1, nRank: 1 })
UserLeagueSchema.index({ iMatchLeagueId: 1, eType: 1, bCancelled: 1 })
UserLeagueSchema.index({ iUserTeamId: 1, nRank: 1 })
UserLeagueSchema.index({ iUserId: 1, eCategory: 1, dCreatedAt: -1, nPrice: 1, nTotalPoints: 1 })
UserLeagueSchema.index({ iMatchLeagueId: 1, iUserId: 1, bCancelled: 1 })
UserLeagueSchema.index({ iMatchLeagueId: 1, bCancelled: 1, 'aExtraWin.0': 1 })
UserLeagueSchema.index({ iMatchLeagueId: 1, bCancelled: 1, nPrice: 1 })
UserLeagueSchema.index({ iMatchLeagueId: 1, bCancelled: 1, nBonusWin: 1 })
UserLeagueSchema.index({ iMatchLeagueId: 1, iUserTeamId: 1, bCancelled: 1 })
UserLeagueSchema.index({ iMatchId: 1, iMatchLeagueId: 1, bCancelled: 1, nTotalPoints: -1 })
UserLeagueSchema.index({ iMatchId: 1, iUserId: 1, iUserTeamId: 1 })
UserLeagueSchema.index({ iMatchLeagueId: 1, bCancelled: 1, nRank: 1 })
UserLeagueSchema.index({ iUserId: 1, iUserTeamId: 1, iMatchLeagueId: 1 }, { unique: true })
UserLeagueSchema.index({ iMatchLeagueId: 1, nRank: 1, iUserId: 1 })

UserLeagueSchema.virtual('oUserTeam', {
  ref: UserTeamModel,
  localField: 'iUserTeamId',
  foreignField: '_id',
  justOne: true
})
UserLeagueSchema.virtual('oUser', {
  ref: UserModel,
  localField: 'iUserId',
  foreignField: '_id',
  justOne: true
})
UserLeagueSchema.virtual('oMatchLeague', {
  ref: MatchLeagueModel,
  localField: 'iMatchLeagueId',
  foreignField: '_id',
  justOne: true
})

const UserLeagueModel = GameDBConnect.model(Constants.tableDetails.userLeague.tableName, UserLeagueSchema);

UserLeagueModel.syncIndexes().then(() => {
    console.log('User League Model Indexes Synced')
}).catch((err) => {
    console.log('User League Model Indexes Sync Error', err)
})

export default UserLeagueModel;
