import { ObjectId } from 'mongodb';

import { MatchCategory, MatchProvider } from '@/enums/matchType/matchCommon';

export interface SeasonAttributes {
    _id: ObjectId;
    sName: string;
    sKey: string;
    eCategory: MatchCategory;
    dStartDate: Date;
    dEndDate: Date;
    eProvider: MatchProvider;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
