import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { MatchCategory } from '@/enums/matchType/matchCommon';
import { UserType } from '@/enums/userProfileType/userCommon';

export interface UserTeamAttributes {
    _id: ObjectId;
    iMatchId: ObjectId;
    iUserId: ObjectId;
    sName: string;
    iCaptainId: ObjectId;
    iViceCaptainId: ObjectId;
    nTotalPoints: number;
    sHash: string;
    bPointCalculated: boolean;
    eCategory: MatchCategory;
    eType: UserType;
    bSwapped: boolean;
    bIsDuplicated: boolean;
    iIsDuplicatedFromUserTeamId: ObjectId;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}

export interface UserTeamStatics extends Model<UserTeamAttributes> {
    filterData(userTeam): any;
}
