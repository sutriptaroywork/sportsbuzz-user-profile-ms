import { Schema } from 'mongoose';

import { SeriesLBDBConnect } from '@/connections/database/mongodb/mongodb';
import { SeriesLBAttributes } from '@/interfaces/seriesLB/seriesLB';
import Constants from '@/configs/constants';

import SeriesLBCategoriesTemplateModel from './seriesLBCategoriesTemplates';

import { MatchStatus, MatchCategory } from '@/enums/matchType/matchCommon';
import { SeriesLBCategoriesTemplateType } from '@/enums/seriesLBType/seriesLBCommon';
import { LeagueRankType } from '@/enums/leagueType/leagueCommon';
import { Status } from '@/enums/statusType/statusCommon';

export interface SeriesLBModelInput extends Omit<SeriesLBAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface SeriesLBModelOutput extends Required<SeriesLBAttributes> {}

const SeriesLBSchema = new Schema<SeriesLBAttributes>(
    {
        sName: { type: String, required: true },
        sKey: { type: String, required: true },
        sInfo: { type: String },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        eStatus: { type: String, enum: Constants.match.status, default: MatchStatus.PENDING },
        aSeriesCategory: [{
            sName: { type: String, required: true },
            eType: { type: String, enum: Constants.seriesLBCategoriesTemplateType, default: SeriesLBCategoriesTemplateType.CONTEST_JOIN },
            sInfo: { type: String },
            sImage: { type: String },
            sColumnText: { type: String },
            iCategoryId: { type: Schema.Types.ObjectId, ref: SeriesLBCategoriesTemplateModel },
            sFirstPrize: { type: String },
            aPrizeBreakup: [{
            nRankFrom: { type: Number },
            nRankTo: { type: Number },
            nPrize: { type: Number },
            eRankType: { type: String, enum: Constants.leagueRankType, default: LeagueRankType.REAL_MONEY },
            sInfo: { type: String },
            sImage: { type: String, trim: true }
            }],
            sContent: { type: String },
            nMaxRank: { type: Number },
            nTotalPayout: { type: Number },
            bPrizeDone: { type: Boolean, default: false },
            bWinningDone: { type: Boolean, default: false },
            eStatus: { type: String, enum: Constants.status, default: Status.ACTIVE },
            sExternalId: { type: String },
            dStartDate: { type: Date },
            dEndDate: { type: Date }
        }],
        dWinDistributedAt: { type: Date },
        bPriceDone: { type: Boolean, default: false }
    },
    { timestamps: { createdAt: Constants.tableDetails.seriesLB.createdAtFieldName, updatedAt: Constants.tableDetails.seriesLB.updatedAtFieldName } }
)

SeriesLBSchema.index({ sKey: 1, eCategory: 1 }, { unique: true })
SeriesLBSchema.index({ eCategory: 1, eStatus: 1 })
SeriesLBSchema.index({ 'aSeriesCategory._id': 1 })

const SeriesLBModel = SeriesLBDBConnect.model(Constants.tableDetails.seriesLB.tableName, SeriesLBSchema)

SeriesLBModel.syncIndexes().then(() => {
  console.log('SeriesLeaderBoard Model Indexes Synced')
}).catch((err) => {
  console.log('SeriesLeaderBoard Model Indexes Sync Error', err)
})

export default SeriesLBModel;
