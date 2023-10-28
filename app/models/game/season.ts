import { Schema } from 'mongoose';

import { GameDBConnect } from '@/connections/database/mongodb/mongodb';
import { SeasonAttributes } from '@/interfaces/game/season';
import Constants from '@/configs/constants';

import { MatchCategory, MatchProvider } from '@/enums/matchType/matchCommon';

export interface SeasonModelInput extends Omit<SeasonAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface SeasonModelOutput extends Required<SeasonAttributes> {}

const SeasonSchema = new Schema<SeasonAttributes>(
    {
        sName: { type: String },
        sKey: { type: String, required: true },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        dStartDate: { type: Date },
        dEndDate: { type: Date },
        eProvider: { type: String, enum: Constants.match.matchProvider, default: MatchProvider.CUSTOM },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.season.createdAtFieldName, updatedAt: Constants.tableDetails.season.updatedAtFieldName } }
)

SeasonSchema.index({ sKey: 1, eCategory: 1, eProvider: 1 }, { unique: true })

const SeasonModel = GameDBConnect.model(Constants.tableDetails.season.tableName, SeasonSchema)

SeasonModel.syncIndexes().then(() => {
    console.log('Season Model Indexes Synced')
}).catch((err) => {
    console.log('Season Model Indexes Sync Error', err)
})

export default SeasonModel;
