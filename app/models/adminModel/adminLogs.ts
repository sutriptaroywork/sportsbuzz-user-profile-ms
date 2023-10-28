import { Schema } from 'mongoose';

import { AdminsDBConnect } from '@/connections/database/mongodb/mongodb';
import { AdminLogsAttributes } from '@/interfaces/admin/adminLogs';
import Constants from '@/configs/constants';

import AdminModel from './admin'
import UserModel from '../userProfile/userProfile'
import MatchModel from '../match/match'

import { AdminLogKeys } from '@/enums/adminType/adminCommon';

export interface AdminLogsModelInput extends Omit<AdminLogsAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface AdminLogsModelOutput extends Required<AdminLogsAttributes> {}

const AdminLogsSchema = new Schema<AdminLogsAttributes>(
    {
        eKey: { type: String, trim: true, required: true, enum: AdminLogKeys },
        iUserId: { type: Schema.Types.ObjectId, ref: UserModel },
        oOldFields: { type: Object },
        oNewFields: { type: Object },
        oDetails: { type: Object },
        sIP: { type: String },
        iAdminId: { type: Schema.Types.ObjectId, ref: AdminModel },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.adminLogs.createdAtFieldName, updatedAt: Constants.tableDetails.adminLogs.updatedAtFieldName } }
);

AdminLogsSchema.virtual('oMatch', {
    ref: MatchModel,
    localField: 'oOldFields.iMatchId',
    foreignField: '_id',
    justOne: true
})

AdminLogsSchema.index({ eKey: 1, oOldFields: 1, oNewFields: 1 })
AdminLogsSchema.index({ 'oNewFields.iMatchId': 1, dCreatedAt: -1, eKey: 1 })
AdminLogsSchema.index({ 'oOldFields.iMatchId': 1, dCreatedAt: -1, eKey: 1 })
AdminLogsSchema.index({ 'oNewFields._id': 1, dCreatedAt: -1, eKey: 1 })
AdminLogsSchema.index({ 'oOldFields._id': 1, dCreatedAt: -1, eKey: 1 })
AdminLogsSchema.index({ dCreatedAt: -1 })

const AdminLogsModel = AdminsDBConnect.model(Constants.tableDetails.adminLogs.tableName, AdminLogsSchema)

AdminLogsModel.syncIndexes().then(() => {
    console.log('Admin Logs Model Indexes Synced')
}).catch((err) => {
    console.log('Admin Logs Model Indexes Sync Error', err)
})

export default AdminLogsModel;
