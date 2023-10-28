import { ObjectId } from 'mongodb';

import { LeagueRankType } from '@/enums/leagueType/leagueCommon';
import { Status } from '@/enums/statusType/statusCommon';
import { MatchCategory } from '@/enums/matchType/matchCommon';
import { RuleType } from '@/enums/cashbackType/cashbackCommon';

interface LeaguePrize {
    nRankFrom: number;
    nRankTo: number;
    nPrize: number;
    eRankType: LeagueRankType;
    sInfo: string;
    sImage: string;
}

export interface LeagueAttributes {
    _id: ObjectId;
    sName: string;
    nMax: number;
    nMin: number;
    nPrice: number;
    nTotalPayout: number;
    nDeductPercent: number;
    nBonusUtil: number;
    aLeaguePrize: [LeaguePrize],
    nTotalWinners: number;
    sPayoutBreakupDesign: string;
    bConfirmLeague: boolean;
    bMultipleEntry: boolean;
    bAutoCreate: boolean;
    bPoolPrize: boolean;
    bUnlimitedJoin: boolean;
    nPosition: number;
    nTeamJoinLimit: number;
    nWinnersCount: number;
    eStatus: Status;
    eCategory: MatchCategory;
    sLeagueCategory: string;
    nLoyaltyPoint: number;
    sFilterCategory: string;
    nMinCashbackTeam: number;
    nCashbackAmount: number;
    bCashbackEnabled: boolean;
    eCashbackType: RuleType;
    iLeagueCatId: ObjectId;
    iFilterCatId: ObjectId;
    nMinTeamCount: number;
    nBotsCount: number;
    nCopyBotsPerTeam: number;
    bBotCreate: boolean;
    bCopyBotInit: boolean;
    nSameCopyBotTeam: number;
    nAutoFillSpots: number;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
