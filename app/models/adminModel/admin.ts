import { Schema } from 'mongoose';

import { AdminsDBConnect } from '@/connections/database/mongodb/mongodb';
import { AdminAttributes } from '@/interfaces/admin/admin';
import Constants from '@/configs/constants';

import RoleModel from '../roleModel/roleModel';

import { AdminTypeEnums } from '@/enums/adminType/adminCommon';
import { AdminPanelPermissionScopeEnums } from '@/enums/AdminPanelPermissionScopeEnums/AdminPanelPermissionScopeEnums';
import { AdminPermissionTypeEnums } from '@/enums/adminPermissionTypeEnums/adminPermissionTypeEnums';
import { AdminStatusEnums } from '@/enums/adminStatusEnums/adminStatusEnums';

export interface AdminModelInput extends Omit<AdminAttributes, '_id' | 'createdAt' | 'updatedAt'> {}
export interface AdminModelOutput extends Required<AdminAttributes> {}

const AdminSchema = new Schema<AdminAttributes>(
  {
    sName: {
      type: String,
      trim: true,
      required: true
    },
    sUsername: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    sEmail: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    sMobNum: {
      type: String,
      trim: true,
      required: true
    },
    sProPic: {
      type: String,
      trim: true
    },
    eType: {
      type: String,
      enum: AdminTypeEnums,
      required: true
    },
    aPermissions: [
      {
        eKey: {
          type: String,
          enum: AdminPanelPermissionScopeEnums
        },
        eType: {
          type: String,
          enum: AdminPermissionTypeEnums
        }
      }
    ],
    iRoleId: {
      type: Schema.Types.ObjectId,
      ref: RoleModel
    },
    sPassword: {
      type: String,
      trim: true,
      required: true
    },
    eStatus: {
      type: String,
      enum: AdminStatusEnums,
      default: AdminStatusEnums.ACTIVE
    },
    aJwtTokens: [
      {
        sToken: {
          type: String
        },
        sPushToken: {
          type: String,
          trim: true
        },
        dTimeStamp: {
          type: Date,
          default: Date.now
        }
      }
    ],
    dLoginAt: {
      type: Date
    },
    dPasswordchangeAt: {
      type: Date
    },
    sVerificationToken: {
      type: String
    },
    sExternalId: {
      type: String
    },
    sDepositToken: {
      type: String
    }
  },
  { timestamps: { createdAt: Constants.tableDetails.admin.createdAtFieldName, updatedAt: Constants.tableDetails.admin.updatedAtFieldName } }
);

const AdminModel = AdminsDBConnect.model(Constants.tableDetails.admin.tableName, AdminSchema);

export default AdminModel;
