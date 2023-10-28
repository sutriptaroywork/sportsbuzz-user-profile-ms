import { ObjectId } from 'mongodb';

export interface SeriesLBUserRankAttributes {
    _id: ObjectId;
    sName: string;
    iSeriesId: ObjectId;
    iCategoryId: ObjectId;
    iUserId: ObjectId;
    sUsername: string;
    sProPic: string;
    bPrizeCalculated: boolean;
    bWinDistribution: boolean;
    nUserRank: number;
    nUserScore: number;
    nPrize: number;
    aExtraWin: [{
        sInfo: string;
        sImage: string;
    }],
    nBonusWin: number;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
