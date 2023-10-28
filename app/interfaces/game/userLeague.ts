import { ObjectId } from 'mongodb';

import { userTypeForJoinLeague } from '@/enums/userProfileType/userCommon';
import { MatchCategory } from '@/enums/matchType/matchCommon';
import { PlatformType } from '@/enums/platformType/platformCommon';

export interface UserLeagueAttributes {
    _id: ObjectId;
    iUserTeamId: ObjectId;
    iUserId: ObjectId;
    iMatchLeagueId: ObjectId;
    iMatchId: ObjectId;
    nTotalPayout: number;
    nPoolPrice: boolean;
    nTotalPoints: number;
    sPayoutBreakupDesign: string;
    nRank: number;
    nPrice: number;
    aExtraWin: [{
        sInfo: string;
        sImage: string;
    }],
    nBonusWin: number;
    sUserName: string;
    eType: userTypeForJoinLeague;
    sProPic: string;
    sTeamName: string;
    sMatchName: string;
    sLeagueName: string;
    ePlatform: PlatformType;
    iPromocodeId: ObjectId;
    nPromoDiscount: number;
    nOriginalPrice: number;
    nPricePaid: number;
    actualCashUsed: number;
    actualBonusUsed: number;
    eCategory: MatchCategory;
    bPointCalculated: boolean;
    bRankCalculated: boolean;
    bPrizeCalculated: boolean;
    bWinDistributed: boolean;
    sExternalId: string;
    bCancelled: boolean;
    bSwapped: boolean;
    bIsDuplicated: boolean;
    bAfterMinJoin: boolean;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
