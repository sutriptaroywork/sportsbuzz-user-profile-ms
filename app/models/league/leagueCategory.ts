import { Schema } from 'mongoose';

import { LeaguesDBConnect } from '@/connections/database/mongodb/mongodb';
import { LeagueCategoryAttributes } from '@/interfaces/league/leagueCategory';
import Constants from '@/configs/constants';

export interface LeagueCategoryModelInput extends Omit<LeagueCategoryAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface LeagueCategoryModelOutput extends Required<LeagueCategoryAttributes> {}

const LeagueCategorySchema = new Schema<LeagueCategoryAttributes>(
    {
        sTitle: { type: String, trim: true, required: true },
        nPosition: { type: Number, required: true },
        sRemark: { type: String, trim: true },
        sKey: { type: String },
        sImage: { type: String },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.leagueCategory.createdAtFieldName, updatedAt: Constants.tableDetails.leagueCategory.updatedAtFieldName } }
);

const LeagueCategoryModel = LeaguesDBConnect.model(Constants.tableDetails.leagueCategory.tableName, LeagueCategorySchema);

export default LeagueCategoryModel;
