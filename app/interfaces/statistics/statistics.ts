import { ObjectId } from 'mongodb';
import { UserType } from '@/enums/userProfileType/userCommon';

interface MatchDetails {
    iMatchId: ObjectId;
    nPlayReturn: number;
}

interface oSportStats {
    aMatchPlayed: [MatchDetails];
    nJoinLeague: number;
    nSpending: number;
    nSpendingCash: number;
    nSpendingBonus: number;
    nWinAmount: number;
    nWinCount: number;
    nCashbackCash: number;
    nCashbackCashCount: number;
    nCashbackBonus: number;
    nCashbackBonusCount: number;
    nCashbackAmount: number;
    nCashbackCount: number;
    nCashbackReturnCash: number;
    nCashbackReturnCashCount: number;
    nCashbackReturnBonus: number;
    nCashbackReturnBonusCount: number;
    nPlayReturn: number;
    nCreatePLeague: number;
    nJoinPLeague: number;
    nCreatePLeagueSpend: number;
    nJoinPLeagueSpend: number;
    nDiscountAmount: number;
    nTDSAmount: number;
    nTDSCount: number;
}

export interface StatisticsAttributes {
    _id: ObjectId;
    iUserId: ObjectId;
    eUserType: UserType;
    oCricket: oSportStats;
    oBaseball: oSportStats;
    oFootball: oSportStats;
    oBasketball: oSportStats;
    oKabaddi: oSportStats;
    nTDSAmount: number;
    nTDSCount: number;
    nTotalWinReturn: number;
    nTotalPlayReturn: number;

    nTotalPlayedCash: number;
    nTotalPlayedBonus: number;
    nTotalPlayReturnCash: number;
    nTotalPlayReturnBonus: number;

    nCashbackCash: number;
    nCashbackBonus: number;
    nTotalCashbackReturnCash: number;
    nTotalCashbackReturnBonus: number;

    nDeposits: number;
    nBonus: number;
    nWithdraw: number;
    nTotalWinnings: number;

    nActualDepositBalance: number;
    nActualWinningBalance: number;
    nActualBonus: number;

    aTotalMatch: [MatchDetails];
    nTotalPLeagueSpend: number;
    nTotalSpend: number;
    nReferrals: number;
    nTotalJoinLeague: number;
    nTotalBonusExpired: number;
    nWinnings: number;

    nCash: number;
    nDepositCount: number;
    nWithdrawCount: number;
    nDiscountAmount: number;
    nDepositDiscount: number;
    nTeams: number;
    sExternalId: string;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
