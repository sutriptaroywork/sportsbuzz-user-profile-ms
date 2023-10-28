import { ObjectId } from 'mongodb';

import { MatchStatus, MatchCategory } from '@/enums/matchType/matchCommon';
import { SeriesLBCategoriesTemplateType } from '@/enums/seriesLBType/seriesLBCommon';
import { LeagueRankType } from '@/enums/leagueType/leagueCommon';
import { Status } from '@/enums/statusType/statusCommon';

export interface SeriesLBAttributes {
    _id: ObjectId;
    sName: string;
    sKey: string;
    sInfo: string;
    eCategory: MatchCategory;
    eStatus: MatchStatus;
    aSeriesCategory: [{
        sName: string;
        eType: SeriesLBCategoriesTemplateType;
        sInfo: string;
        sImage: string;
        sColumnText: string;
        iCategoryId: ObjectId;
        sFirstPrize: string;
        aPrizeBreakup: [{
        nRankFrom: number;
        nRankTo: number;
        nPrize: number;
        eRankType: LeagueRankType; // R = REAL_MONEY, B = BONUS, E = EXTRA
        sInfo: string;
        sImage: string;
        }],
        sContent: string;
        nMaxRank: number;
        nTotalPayout: number;
        bPrizeDone: boolean;
        bWinningDone: boolean;
        eStatus: Status;
        sExternalId: string;
        dStartDate: Date;
        dEndDate: Date;
    }],
    dWinDistributedAt: Date;
    bPriceDone: boolean;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
