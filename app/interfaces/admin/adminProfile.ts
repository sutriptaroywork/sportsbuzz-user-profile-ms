import { ObjectId } from 'mongodb';

export interface AdminDetailsQuery {
    bIsMobVerified?: boolean;
    bIsInternalAccount?: boolean;
    bIsEmailVerified?: boolean;
    dCreatedAt?: object;
    _id?: ObjectId;
    $or?: [
        { sUsername: object; },
        { sEmail: object; },
        { sMobNum: object; }
    ];
    eType?: string;
}

export interface AdminRefferedQuery {
    iReferredBy: ObjectId;
    $or?: [
        { sUsername: object; },
        { sEmail: object; },
        { sMobNum: object; }
    ];
}
