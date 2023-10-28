import { Schema } from 'mongoose';

import { StatisticsDBConnect } from '@/connections/database/mongodb/mongodb';
import { CitiesAttributes } from '@/interfaces/statistics/cities';
import Constants from '@/configs/constants';

export interface CitiesModelInput extends Omit<CitiesAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface CitiesModelOutput extends Required<CitiesAttributes> {}
export interface CitiesModelOutputSelected extends Pick<CitiesAttributes, 'sName'> {}

const CitiesSchema = new Schema<CitiesAttributes>(
  {
    id: { type: Number, require: true },
    nStateId: { type: Number, trim: true },
    sName: { type: String, trim: true },
    sExternalId: { type: String }
  },
  { timestamps: { createdAt: Constants.tableDetails.cities.createdAtFieldName, updatedAt: Constants.tableDetails.cities.updatedAtFieldName } }
);

CitiesSchema.index({ sName: 1, nStateId: 1 })

const CitiesModel = StatisticsDBConnect.model(Constants.tableDetails.cities.tableName, CitiesSchema);

export default CitiesModel;
