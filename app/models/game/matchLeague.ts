import { Schema } from 'mongoose';

import { GameDBConnect } from '@/connections/database/mongodb/mongodb';
import { MatchLeagueAttributes } from '@/interfaces/game/matchLeague';
import Constants from '@/configs/constants';

import MatchModel from '../match/match';
import UserModel from '../userProfile/userProfile';
import LeagueModel from '../league/league';
import LeagueCategoryModel from '../league/leagueCategory';
import FilterCategoryModel from '../league/filterCategory';

import { LeagueRankType } from '@/enums/leagueType/leagueCommon';
import { MatchCategory, MatchStatus } from '@/enums/matchType/matchCommon';
import { RuleType } from '@/enums/cashbackType/cashbackCommon';
import { leagueReportStatus } from '@/enums/matchType/matchCommon';

export interface MatchLeagueModelInput extends Omit<MatchLeagueAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface MatchLeagueModelOutput extends Required<MatchLeagueAttributes> {}

const MatchLeagueSchema = new Schema<MatchLeagueAttributes>(
    {
        iMatchId: { type: Schema.Types.ObjectId, ref: MatchModel, index: true },
        iLeagueId: { type: Schema.Types.ObjectId, ref: LeagueModel },
        iLeagueCatId: { type: Schema.Types.ObjectId, ref: LeagueCategoryModel },
        iFilterCatId: { type: Schema.Types.ObjectId, ref: FilterCategoryModel },
        sShareLink: { type: String, trim: true },
        sName: { type: String, trim: true, required: true },
        nMax: { type: Number, required: true },
        nMin: { type: Number, required: true },
        nPrice: { type: Number },
        nTotalPayout: { type: Number },
        nDeductPercent: { type: Number },
        nBonusUtil: { type: Number },
        aLeaguePrize: [{
            nRankFrom: { type: Number },
            nRankTo: { type: Number },
            nPrize: { type: Number },
            eRankType: { type: String, enum: Constants.leagueRankType, default: LeagueRankType.REAL_MONEY },
            sInfo: { type: String },
            sImage: { type: String, trim: true }
        }],
        sLeagueCategory: { type: String },
        sFilterCategory: { type: String },
        sPayoutBreakupDesign: { type: String },
        bConfirmLeague: { type: Boolean, default: false },
        bMultipleEntry: { type: Boolean, default: false },
        bAutoCreate: { type: Boolean, default: false },
        bCancelled: { type: Boolean, default: false },
        bPoolPrize: { type: Boolean, default: false },
        bUnlimitedJoin: { type: Boolean, default: false },
        bCopyLeague: { type: Boolean },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        nPosition: { type: Number },
        nLeaguePrice: { type: Number },
        bPrizeDone: { type: Boolean, default: false },
        bWinningDone: { type: Boolean, default: false },
        nWinnersCount: { type: Number },
        nTeamJoinLimit: { type: Number, default: 1 },
        nJoined: { type: Number, default: 0 },
        iUserId: { type: Schema.Types.ObjectId, ref: UserModel },
        bPrivateLeague: { type: Boolean, default: false },
        sFairPlay: { type: String },
        nAdminCommission: { type: Number },
        nCreatorBonusGst: { type: Number, default: 0 },
        nCreatorCommission: { type: Number },
        nLoyaltyPoint: { type: Number, default: 0 },
        bCashbackEnabled: { type: Boolean, default: false },
        nMinCashbackTeam: { type: Number, default: 0 },
        nCashbackAmount: { type: Number },
        eCashbackType: { type: String, enum: Constants.ruleType, default: RuleType.BONUS, nullable: true },
        bIsProcessed: { type: Boolean, default: false }, // for cashback purpose
        bPlayReturnProcess: { type: Boolean, default: false }, // for process play-return purpose
        sShareCode: { type: String },
        bInternalLeague: { type: Boolean, default: false },
        nMinTeamCount: { type: Number },
        nBotsCount: { type: Number },
        nCopyBotsPerTeam: { type: Number },
        eMatchStatus: { type: String, enum: Constants.match.status, default: MatchStatus.PENDING },
        bBotCreate: { type: Boolean, default: false },
        bCopyBotInit: { type: Boolean, default: false },
        nSameCopyBotTeam: { type: Number },
        nDistributedPayout: { type: Number, default: 0 },
        nAutoFillSpots: { type: Number, default: 0 },
        eReportStatus: { type: String, enum: Constants.match.leagueReportStatus, default: leagueReportStatus.NOT_GENERATED },
        aReportUrl: [{ type: String }],
        sExternalId: { type: String }
    },
    {
        toObject: { virtuals: true },
        timestamps: { createdAt: Constants.tableDetails.matchLeague.createdAtFieldName, updatedAt: Constants.tableDetails.matchLeague.updatedAtFieldName } 
    }
);

MatchLeagueSchema.virtual('oLeagueCategory', {
    ref: LeagueCategoryModel,
    localField: 'iLeagueCatId',
    foreignField: '_id'
})
MatchLeagueSchema.virtual('oMatch', {
    ref: MatchModel,
    localField: 'iMatchId',
    foreignField: '_id',
    justOne: true
})
  
MatchLeagueSchema.index({ iMatchId: 1, bCancelled: 1, bPrizeDone: 1, eCategory: 1 })
MatchLeagueSchema.index({ iMatchId: 1, bPrivateLeague: 1, bCancelled: 1, sShareCode: 1 })
MatchLeagueSchema.index({ iMatchId: 1, bCancelled: 1 })
MatchLeagueSchema.index({ dCreatedAt: 1 })
MatchLeagueSchema.index({ eMatchStatus: 1, bCancelled: 1, nJoined:1 })

const MatchLeagueModel = GameDBConnect.model(Constants.tableDetails.matchLeague.tableName, MatchLeagueSchema);

MatchLeagueModel.syncIndexes().then(() => {
    console.log('Match League Model Indexes Synced')
}).catch((err) => {
    console.log('Match League Model Indexes Sync Error', err)
})

export default MatchLeagueModel;
