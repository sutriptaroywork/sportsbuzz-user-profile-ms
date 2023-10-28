import { ObjectId } from 'mongodb';

export interface LeagueCategoryAttributes {
    _id: ObjectId;
    sTitle: string;
    nPosition: number;
    sRemark: string;
    sKey: string;
    sImage: string;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
