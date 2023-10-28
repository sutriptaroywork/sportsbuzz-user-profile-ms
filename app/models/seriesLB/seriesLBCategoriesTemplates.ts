import { Schema } from 'mongoose';

import { SeriesLBDBConnect } from '@/connections/database/mongodb/mongodb';
import { SeriesLBCategoriesTemplateAttributes } from '@/interfaces/seriesLB/seriesLBCategoriesTemplates';
import Constants from '@/configs/constants';

import { SeriesLBCategoriesTemplateType } from '@/enums/seriesLBType/seriesLBCommon';

export interface SeriesLBCategoriesTemplateModelInput extends Omit<SeriesLBCategoriesTemplateAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface SeriesLBCategoriesTemplateModelOutput extends Required<SeriesLBCategoriesTemplateAttributes> {}

const SeriesLBCategoriesTemplateSchema = new Schema<SeriesLBCategoriesTemplateAttributes>(
    {
        sName: { type: String, required: true },
        eType: { type: String, enum: SeriesLBCategoriesTemplateType, default: SeriesLBCategoriesTemplateType.CONTEST_JOIN },
        sInfo: { type: String },
        sImage: { type: String },
        sColumnText: { type: String },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.seriesLBCategoriesTemplate.createdAtFieldName, updatedAt: Constants.tableDetails.seriesLBCategoriesTemplate.updatedAtFieldName } }
)

const SeriesLBCategoriesTemplateModel = SeriesLBDBConnect.model(Constants.tableDetails.seriesLBCategoriesTemplate.tableName, SeriesLBCategoriesTemplateSchema)
export default SeriesLBCategoriesTemplateModel;
