import { Schema} from 'mongoose';
import { AdminPanelPermissionScopeEnums } from '@/enums/AdminPanelPermissionScopeEnums/AdminPanelPermissionScopeEnums';
import { AdminPermissionTypeEnums } from '@/enums/adminPermissionTypeEnums/adminPermissionTypeEnums';
import { Status } from '@/enums/statusType/statusCommon';
import { AdminsDBConnect } from '@/connections/database/mongodb/mongodb';

interface RoleAttributes {
  sName: string;
  aPermissions: [
    {
      sKey: AdminPanelPermissionScopeEnums;
      eType: AdminPermissionTypeEnums; // R = READ, W = WRITE, N = NONE - Rights
    }
  ];
  eStatus: Status;
  sExternalId: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleModelInput extends Omit<RoleAttributes, '_id' | 'createdAt' | 'updatedAt'> {}
export interface RoleModelOutput extends Required<RoleAttributes> {}

const RoleSchema = new Schema<RoleAttributes>(
  {
    sName: {
      type: String,
      required: true
    },
    aPermissions: [
      {
        sKey: {
          type: String,
          enum: AdminPanelPermissionScopeEnums
        },
        eType: {
          type: String,
          enum: AdminPermissionTypeEnums
        }
      }
    ],
    eStatus: {
      type: String,
      enum: Status,
      default: Status.ACTIVE
    },
    sExternalId: {
      type: String
    }
  },
  { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } }
);

const RoleModel = AdminsDBConnect.model('roles', RoleSchema);

export default RoleModel;
