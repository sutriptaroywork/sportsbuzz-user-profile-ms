import { UserType } from '@/enums/userProfileType/userCommon';
import { TransactionType } from '@/enums/transactionType/transactionCommon';
import { PassbookType, PassbookStatus } from '@/enums/passbookType/passbookCommon';

export interface PassbookAttributes {
    id: number;
    iUserId: string;
    nAmount: number;
    nBonus: number;
    nCash: number;
    nOldWinningBalance: number;
    nOldDepositBalance: number;
    nOldTotalBalance: number;
    nNewWinningBalance: number;
    nNewDepositBalance: number;
    nNewTotalBalance: number;
    nOldBonus: number;
    nNewBonus: number;
    eTransactionType: TransactionType;
    dBonusExpiryDate: Date;
    bIsBonusExpired: boolean;
    bCreatorBonusReturn: boolean;
    bWinReturn: boolean;
    iPreviousId: number;
    iUserLeagueId: string;
    iMatchId: string;
    iMatchLeagueId: string;
    iSeriesId: string;
    iCategoryId: string;
    sPromocode: string;
    iTransactionId: string;
    iUserDepositId: string;
    iWithdrawId: string;
    nWithdrawFee: number;
    sRemarks: string;
    sCommonRule: string;
    eUserType: UserType;
    eStatus: PassbookStatus;
    eType: PassbookType;
    nLoyaltyPoint: number;
    eCategory: string;
    dActivityDate: Date;
    dProcessedDate: Date;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}

export interface PassbookCreateSchema {
    iUserId: string;
    eUserType: UserType;
    eTransactionType: TransactionType;
    eType: PassbookType;
    sRemarks: string;
    dActivityDate: Date;
}
