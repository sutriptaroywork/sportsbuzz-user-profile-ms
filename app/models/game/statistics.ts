import { Schema } from 'mongoose';

import { GameDBConnect } from '@/connections/database/mongodb/mongodb';
import { StatisticsAttributes } from '@/interfaces/statistics/statistics';
import Constants from '@/configs/constants';

import UserModel from '@/models/userProfile/userProfile';
import MatchModel from '@/models/match/match';

import { UserType } from '@/enums/userProfileType/userCommon';

export interface StatisticsModelInput extends Omit<StatisticsAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface StatisticsModelInputUid extends Pick<StatisticsAttributes, 'iUserId'> {}
export interface StatisticsModelOutput extends Required<StatisticsAttributes> {}
export interface StatisticsModelOutputTotalWinnings extends Pick<StatisticsAttributes, 'nTotalWinnings'> {}

const matchDetails = {
    iMatchId: { type: Schema.Types.ObjectId, ref: MatchModel },
    nPlayReturn: { type: Number, default: 0 }
}
const oSportStats = {
    aMatchPlayed: [matchDetails],
    nJoinLeague: { type: Number, default: 0 },
    nSpending: { type: Number, default: 0 },
    nSpendingCash: { type: Number, default: 0 },
    nSpendingBonus: { type: Number, default: 0 },
    nWinAmount: { type: Number, default: 0 },
    nWinCount: { type: Number, default: 0 },
    nCashbackCash: { type: Number, default: 0 },
    nCashbackCashCount: { type: Number, default: 0 },
    nCashbackBonus: { type: Number, default: 0 },
    nCashbackBonusCount: { type: Number, default: 0 },
    nCashbackAmount: { type: Number, default: 0 },
    nCashbackCount: { type: Number, default: 0 },
    nCashbackReturnCash: { type: Number, default: 0 },
    nCashbackReturnCashCount: { type: Number, default: 0 },
    nCashbackReturnBonus: { type: Number, default: 0 },
    nCashbackReturnBonusCount: { type: Number, default: 0 },
    nPlayReturn: { type: Number, default: 0 },
    nCreatePLeague: { type: Number, default: 0 },
    nJoinPLeague: { type: Number, default: 0 },
    nCreatePLeagueSpend: { type: Number, default: 0 },
    nJoinPLeagueSpend: { type: Number, default: 0 },
    nDiscountAmount: { type: Number, default: 0 },
    nTDSAmount: { type: Number, default: 0 },
    nTDSCount: { type: Number, default: 0 }
}

const StatisticsSchema = new Schema<StatisticsAttributes>(
    {
        iUserId: { type: Schema.Types.ObjectId, ref: UserModel, required: true, unique: true },
        eUserType: { type: String, enum: Constants.user.userType, default: UserType.USER },
        oCricket: oSportStats,
        oBaseball: oSportStats,
        oFootball: oSportStats,
        oBasketball: oSportStats,
        oKabaddi: oSportStats,
        nTDSAmount: { type: Number, default: 0 },
        nTDSCount: { type: Number, default: 0 },
        nTotalWinReturn: { type: Number, default: 0 },
        nTotalPlayReturn: { type: Number, default: 0 },
    
        nTotalPlayedCash: { type: Number, default: 0 }, // Total played cash
        nTotalPlayedBonus: { type: Number, default: 0 }, // Total played bonus
        nTotalPlayReturnCash: { type: Number, default: 0 }, // Total play-return cash
        nTotalPlayReturnBonus: { type: Number, default: 0 }, // Total play-return bonus
    
        nCashbackCash: { type: Number, default: 0 }, // Total Cashback cash
        nCashbackBonus: { type: Number, default: 0 }, // Total Cashback bonus
        nTotalCashbackReturnCash: { type: Number, default: 0 }, // Total Cashback Return amount
        nTotalCashbackReturnBonus: { type: Number, default: 0 }, // Total Cashback Return amount
    
        nDeposits: { type: Number, default: 0 }, // Total Deposit amount
        nBonus: { type: Number, default: 0 }, // Total Bonus amount
        nWithdraw: { type: Number, default: 0 }, // Total Withdraw amount
        nTotalWinnings: { type: Number, default: 0 }, // Total Winning amount
    
        nActualDepositBalance: { type: Number, default: 0 }, // Actual Deposit amount
        nActualWinningBalance: { type: Number, default: 0 }, // Actual Winning amount
        nActualBonus: { type: Number, default: 0 }, // Actual Bonus amount
    
        aTotalMatch: [matchDetails],
        nTotalPLeagueSpend: { type: Number, default: 0 }, // !check
        nTotalSpend: { type: Number, default: 0 }, // !check
        nReferrals: { type: Number, default: 0 },
        nTotalJoinLeague: { type: Number, default: 0 },
        nTotalBonusExpired: { type: Number, default: 0 },
        nWinnings: { type: Number, default: 0 }, // !check

        nCash: { type: Number, default: 0 },
        nDepositCount: { type: Number, default: 0 },
        nWithdrawCount: { type: Number, default: 0 },
        nDiscountAmount: { type: Number, default: 0 },
        nDepositDiscount: { type: Number, default: 0 },
        nTeams: { type: Number, default: 0 },
        sExternalId: { type: String }
    },
    { timestamps: { createdAt: Constants.tableDetails.statistics.createdAtFieldName, updatedAt: Constants.tableDetails.statistics.updatedAtFieldName } }
)
StatisticsSchema.index({ iUserId: 1 })
  
const StatisticsModel = GameDBConnect.model(Constants.tableDetails.statistics.tableName, StatisticsSchema)
export default StatisticsModel;
