import { ObjectId } from 'mongodb';

import { Status } from '@/enums/statusType/statusCommon';

export interface StatesAttributes {
    _id: ObjectId;
    id: number;
    nCountryId: number;
    sName: string;
    eStatus: Status;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
