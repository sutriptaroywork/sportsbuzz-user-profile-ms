import { ObjectId } from 'mongodb';

import { LeagueRankType } from '@/enums/leagueType/leagueCommon';
import { MatchCategory, MatchStatus } from '@/enums/matchType/matchCommon';
import { RuleType } from '@/enums/cashbackType/cashbackCommon';
import { leagueReportStatus } from '@/enums/matchType/matchCommon';

interface LeaguePrize {
    nRankFrom: number;
    nRankTo: number;
    nPrize: number;
    eRankType: LeagueRankType;
    sInfo: string;
    sImage: string;
}

export interface MatchLeagueAttributes {
    _id: ObjectId;
    iMatchId: ObjectId;
    iLeagueId: ObjectId;
    iLeagueCatId: ObjectId;
    iFilterCatId: ObjectId;
    sShareLink: string;
    sName: string;
    nMax: number;
    nMin: number;
    nPrice: number;
    nTotalPayout: number;
    nDeductPercent: number;
    nBonusUtil: number;
    aLeaguePrize: [LeaguePrize],
    sLeagueCategory: string;
    sFilterCategory: string;
    sPayoutBreakupDesign: string;
    bConfirmLeague: boolean;
    bMultipleEntry: boolean;
    bAutoCreate: boolean;
    bCancelled: boolean;
    bPoolPrize: boolean;
    bUnlimitedJoin: boolean;
    bCopyLeague: boolean;
    eCategory: MatchCategory;
    nPosition: number;
    nLeaguePrice: number;
    bPrizeDone: boolean;
    bWinningDone: boolean;
    nWinnersCount: number;
    nTeamJoinLimit: number;
    nJoined: number;
    iUserId: ObjectId;
    bPrivateLeague: boolean;
    sFairPlay: string;
    nAdminCommission: number;
    nCreatorBonusGst: number;
    nCreatorCommission: number;
    nLoyaltyPoint: number;
    bCashbackEnabled: boolean;
    nMinCashbackTeam: number;
    nCashbackAmount: number;
    eCashbackType: RuleType;
    bIsProcessed: boolean;
    bPlayReturnProcess: boolean;
    sShareCode: string;
    bInternalLeague: boolean;
    nMinTeamCount: number;
    nBotsCount: number;
    nCopyBotsPerTeam: number;
    eMatchStatus: MatchStatus;
    bBotCreate: boolean;
    bCopyBotInit: boolean;
    nSameCopyBotTeam: number;
    nDistributedPayout: number;
    nAutoFillSpots: number;
    eReportStatus: leagueReportStatus;
    aReportUrl: [string];
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
