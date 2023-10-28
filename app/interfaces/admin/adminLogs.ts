import { ObjectId } from 'mongodb';

import { AdminLogKeys } from '@/enums/adminType/adminCommon';

export interface AdminLogsAttributes {
    eKey: AdminLogKeys;
    iUserId: ObjectId;
    oOldFields: object;
    oNewFields: object;
    oDetails: object;
    sIP: string;
    iAdminId: ObjectId;
    sExternalId: string;
}
