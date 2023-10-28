import { Schema } from 'mongoose';

import { StatisticsDBConnect } from '@/connections/database/mongodb/mongodb';
import { StatesAttributes } from '@/interfaces/statistics/states';
import Constants from '@/configs/constants';

import { Status } from '@/enums/statusType/statusCommon';

export interface StatesModelInput extends Omit<StatesAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface StatesModelOutput extends Required<StatesAttributes> {}
export interface StatesModelOutputSelected extends Pick<StatesAttributes, 'id' | 'sName' | 'eStatus'> {}

const StatesSchema = new Schema<StatesAttributes>(
  {
    id: { type: Number, require: true },
    nCountryId: { type: Number, trim: true },
    sName: { type: String, trim: true },
    eStatus: { type: String, enum: Constants.status, default: Status.ACTIVE },
    sExternalId: { type: String }
  },
  { timestamps: { createdAt: Constants.tableDetails.states.createdAtFieldName, updatedAt: Constants.tableDetails.states.updatedAtFieldName } }
);

StatesSchema.index({ sName: 1 })

const StatesModel = StatisticsDBConnect.model(Constants.tableDetails.states.tableName, StatesSchema);

export default StatesModel;
