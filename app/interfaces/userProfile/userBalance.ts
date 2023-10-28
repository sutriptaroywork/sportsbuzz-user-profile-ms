import { UserType } from '@/enums/userProfileType/userCommon';

export interface UserBalanceAttributes {
    id: number;
    iUserId: string;
    nCurrentWinningBalance: number;
    nCurrentDepositBalance: number;
    nCurrentTotalBalance: number;
    nCurrentBonus: number;
    nExpiredBonus: number;
    nTotalBonusEarned: number;
    nTotalBonusReturned: number;
    nTotalCashbackReturned: number;
    nTotalWinningAmount: number;
    nTotalDepositAmount: number;
    nTotalDepositCount: number;
    nTotalWithdrawAmount: number;
    nTotalWithdrawCount: number;
    nTotalLoyaltyPoints: number;
    eUserType: UserType;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}

export interface UserBalanceCreateSchema {
    iUserId: string;
    eUserType: UserType;
}
