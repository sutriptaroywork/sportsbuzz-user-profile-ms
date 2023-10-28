import { Schema } from 'mongoose';

import { SeriesLBDBConnect } from '@/connections/database/mongodb/mongodb';
import { SeriesLBUserRankAttributes } from '@/interfaces/seriesLB/seriesLBUserRank';
import Constants from '@/configs/constants';

import UserModel from '../userProfile/userProfile';
import SeriesLBModel from './seriesLB';

export interface SeriesLBUserRankModelInput extends Omit<SeriesLBUserRankAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface SeriesLBUserRankModelOutput extends Required<SeriesLBUserRankAttributes> {}

const SeriesLBUserRankSchema = new Schema<SeriesLBUserRankAttributes>(
    {
        sName: { type: String, required: true },
        iSeriesId: { type: Schema.Types.ObjectId, ref: SeriesLBModel },
        iCategoryId: { type: Schema.Types.ObjectId },
        iUserId: { type: Schema.Types.ObjectId, ref: UserModel },
        sUsername: { type: String, trim: true },
        sProPic: { type: String, trim: true },
        bPrizeCalculated: { type: Boolean, default: false },
        bWinDistribution: { type: Boolean, default: false },
        nUserRank: { type: Number },
        nUserScore: { type: Number },
        nPrize: { type: Number },
        aExtraWin: [{
            sInfo: { type: String },
            sImage: { type: String, trim: true }
        }],
        nBonusWin: { type: Number, default: 0 }, // Bonus win
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.seriesLBUserRank.createdAtFieldName, updatedAt: Constants.tableDetails.seriesLBUserRank.updatedAtFieldName } }
)

SeriesLBUserRankSchema.virtual('oUser', {
    ref: UserModel,
    localField: 'iUserId',
    foreignField: '_id',
    justOne: true
})

const SeriesLBUserRankModel = SeriesLBDBConnect.model(Constants.tableDetails.seriesLBUserRank.tableName, SeriesLBUserRankSchema)

export default SeriesLBUserRankModel;
