import { ObjectId } from 'mongodb';

import { AdminTypeEnums } from '@/enums/adminType/adminCommon';
import { AdminPanelPermissionScopeEnums } from '@/enums/AdminPanelPermissionScopeEnums/AdminPanelPermissionScopeEnums';
import { AdminPermissionTypeEnums } from '@/enums/adminPermissionTypeEnums/adminPermissionTypeEnums';
import { AdminStatusEnums } from '@/enums/adminStatusEnums/adminStatusEnums';

export interface AdminAttributes {
    sName: string;
    sUsername: string;
    sEmail: string;
    sMobNum: string;
    sProPic: string;
    eType: AdminTypeEnums;
    aPermissions: Array<{
      eKey: AdminPanelPermissionScopeEnums;
      eType: AdminPermissionTypeEnums;
    }>;
    iRoleId: ObjectId;
    sPassword: string;
    eStatus: AdminStatusEnums;
    aJwtTokens: Array<{
      sToken: string;
      sPushToken: string;
      dTimeStamp: Date;
    }>;
    dLoginAt: Date;
    dPasswordchangeAt: Date;
    sVerificationToken: string;
    sExternalId: string;
    sDepositToken: string;
  
    createdAt?: Date;
    updatedAt?: Date;
}
