import { ObjectId } from 'mongodb';

export interface CitiesAttributes {
    _id: ObjectId;
    id: number;
    nStateId: number;
    sName: string;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
