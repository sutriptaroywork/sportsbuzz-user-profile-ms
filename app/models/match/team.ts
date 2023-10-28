import { Schema } from 'mongoose';

import { MatchDBConnect } from '@/connections/database/mongodb/mongodb';
import { TeamAttributes } from '@/interfaces/match/team';
import Constants from '@/configs/constants';

import { MatchCategory, MatchProvider } from '@/enums/matchType/matchCommon';
import { Status } from '@/enums/statusType/statusCommon';

export interface TeamModelInput extends Omit<TeamAttributes, '_id' | 'createdAt' | 'updatedAt'> {}
export interface TeamModelOutput extends Required<TeamAttributes> {}

const TeamSchema = new Schema<TeamAttributes>(
    {
        sKey: { type: String, trim: true, required: true },
        sName: { type: String, trim: true },
        sShortName: { type: String, trim: true },
        sThumbUrl: { type: String, trim: true },
        eCategory: { type: String, enum: Constants.match.category, default: MatchCategory.CRICKET },
        eStatus: { type: String, enum: Constants.status, default: Status.ACTIVE }, // Y = Active, N = Not Active
        sLogoUrl: { type: String, trim: true },
        sImage: { type: String, trim: true },
        eProvider: { type: String, enum: Constants.match.matchProvider, default: MatchProvider.CUSTOM },
        sExternalId: { type: String },
        bIsNameUpdated: { type: Boolean, default: false },
        dCreatedAt: { type : Date },
        dUpdatedAt: { type : Date }
    },
    { timestamps: { createdAt: Constants.tableDetails.team.createdAtFieldName, updatedAt: Constants.tableDetails.team.updatedAtFieldName } }
)

TeamSchema.index({ sKey: 1, eCategory: 1, eProvider: 1 }, { unique: true })
const TeamModel = MatchDBConnect.model(Constants.tableDetails.team.tableName, TeamSchema)
export default TeamModel;
