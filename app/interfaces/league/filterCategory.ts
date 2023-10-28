import { ObjectId } from 'mongodb';

export interface FilterCategoryAttributes {
    _id: ObjectId;
    sTitle: string;
    sRemark: string;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
