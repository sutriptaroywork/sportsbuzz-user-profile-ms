import { ObjectId } from 'mongodb';

import { MatchCategory, MatchProvider } from '@/enums/matchType/matchCommon';
import { Status } from '@/enums/statusType/statusCommon';

export interface TeamAttributes {
    _id: ObjectId;
    sKey: string;
    sName: string;
    sShortName: string;
    sThumbUrl: string;
    eCategory: { type: String, enum: MatchCategory, default: MatchCategory.CRICKET },
    eStatus: { type: String, enum: Status, default: Status.ACTIVE }, // Y = Active, N = Not Active
    sLogoUrl: string;
    sImage: string;
    eProvider: { type: String, enum: MatchProvider, default: MatchProvider.CUSTOM },
    sExternalId: string;
    bIsNameUpdated: boolean;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
