import { Schema } from 'mongoose';

import { LeaguesDBConnect } from '@/connections/database/mongodb/mongodb';
import { LeagueAttributes } from '@/interfaces/league/league';
import Constants from '@/configs/constants';

import LeagueCategoryModel from './leagueCategory';
import FilterCategoryModel from './filterCategory';

import { LeagueRankType } from '@/enums/leagueType/leagueCommon';
import { Status } from '@/enums/statusType/statusCommon';
import { MatchCategory } from '@/enums/matchType/matchCommon';
import { RuleType } from '@/enums/cashbackType/cashbackCommon';

export interface LeagueModelInput extends Omit<LeagueAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface LeagueModelOutput extends Required<LeagueAttributes> {}

const LeagueSchema = new Schema<LeagueAttributes>(
    {
        sName: { type: String, trim: true, required: true },
        nMax: { type: Number, required: true },
        nMin: { type: Number, required: true },
        nPrice: { type: Number, required: true },
        nTotalPayout: { type: Number, required: true },
        nDeductPercent: { type: Number },
        nBonusUtil: { type: Number, default: 0 },
        aLeaguePrize: [{
            nRankFrom: { type: Number },
            nRankTo: { type: Number },
            nPrize: { type: Number },
            eRankType: { type: String, enum: Constants.leagueRankType, default: LeagueRankType.REAL_MONEY }, // R = REAL_MONEY, B = BONUS, E = EXTRA
            sInfo: { type: String },
            sImage: { type: String, trim: true }
        }],
        nTotalWinners: { type: Number },
        sPayoutBreakupDesign: { type: String },
        bConfirmLeague: { type: Boolean, default: false },
        bMultipleEntry: { type: Boolean, default: false },
        bAutoCreate: { type: Boolean, default: false },
        bPoolPrize: { type: Boolean, default: false },
        bUnlimitedJoin: { type: Boolean, default: false },
        nPosition: { type: Number },
        nTeamJoinLimit: { type: Number, default: 1 },
        nWinnersCount: { type: Number },
        eStatus: { type: String, enum: Constants.status, default: Status.INACTIVE },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        sLeagueCategory: { type: String },
        nLoyaltyPoint: { type: Number, default: 0 },
        sFilterCategory: { type: String },
        nMinCashbackTeam: { type: Number, default: 0 },
        nCashbackAmount: { type: Number },
        bCashbackEnabled: { type: Boolean, default: false },
        eCashbackType: { type: String, enum: Constants.ruleType, default: RuleType.BONUS }, // C = CASH, B = BONUS
        iLeagueCatId: { type: Schema.Types.ObjectId, ref: LeagueCategoryModel, required: true },
        iFilterCatId: { type: Schema.Types.ObjectId, ref: FilterCategoryModel, required: true },
        nMinTeamCount: { type: Number },
        nBotsCount: { type: Number },
        nCopyBotsPerTeam: { type: Number },
        bBotCreate: { type: Boolean, default: false },
        bCopyBotInit: { type: Boolean, default: false },
        nSameCopyBotTeam: { type: Number },
        nAutoFillSpots: { type: Number, default: 0 },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.league.createdAtFieldName, updatedAt: Constants.tableDetails.league.updatedAtFieldName } }
);

LeagueSchema.index({ eCategory: 1 })

const LeagueModel = LeaguesDBConnect.model(Constants.tableDetails.league.tableName, LeagueSchema);

export default LeagueModel;
