import { Schema } from 'mongoose';

import { LeaguesDBConnect } from '@/connections/database/mongodb/mongodb';
import { FilterCategoryAttributes } from '@/interfaces/league/filterCategory';
import Constants from '@/configs/constants';

export interface LeagueCategoryModelInput extends Omit<FilterCategoryAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface LeagueCategoryModelOutput extends Required<FilterCategoryAttributes> {}

const FilterCategorySchema = new Schema<FilterCategoryAttributes>(
    {
        sTitle: { type: String, trim: true, required: true },
        sRemark: { type: String, trim: true },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.filterCategory.createdAtFieldName, updatedAt: Constants.tableDetails.filterCategory.updatedAtFieldName } }
);

const FilterCategoryModel = LeaguesDBConnect.model(Constants.tableDetails.filterCategory.tableName, FilterCategorySchema);

export default FilterCategoryModel;
