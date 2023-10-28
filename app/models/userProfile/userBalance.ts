
import { DataTypes, Model, Optional } from 'sequelize';

import sequelize from '@/connections/database/mysql/mysql';
import { UserBalanceAttributes } from '@/interfaces/userProfile/userBalance';
import Constants from '@/configs/constants';

import { UserType } from '@/enums/userProfileType/userCommon';

export interface UserBalanceInput extends Omit<UserBalanceAttributes, 'id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface UserBalanceOuput extends Required<UserBalanceAttributes> {}

class UserBalance extends Model<UserBalanceAttributes, UserBalanceInput> implements UserBalanceAttributes {
  public id!: number
  public iUserId!: string
  public nCurrentWinningBalance: number
  public nCurrentDepositBalance: number
  public nCurrentTotalBalance: number
  public nCurrentBonus: number
  public nExpiredBonus: number
  public nTotalBonusEarned: number
  public nTotalBonusReturned: number
  public nTotalCashbackReturned: number
  public nTotalWinningAmount: number
  public nTotalDepositAmount: number
  public nTotalDepositCount: number
  public nTotalWithdrawAmount: number
  public nTotalWithdrawCount: number
  public nTotalLoyaltyPoints: number
  public eUserType: UserType
  public dCreatedAt: Date
  public dUpdatedAt: Date
}

UserBalance.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  iUserId: { type: DataTypes.STRING(24), allowNull: false },
  nCurrentWinningBalance: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nCurrentDepositBalance: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nCurrentTotalBalance: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nCurrentBonus: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nExpiredBonus: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nTotalBonusEarned: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nTotalBonusReturned: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nTotalCashbackReturned: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nTotalWinningAmount: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nTotalDepositAmount: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nTotalDepositCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  nTotalWithdrawAmount: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nTotalWithdrawCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  nTotalLoyaltyPoints: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  eUserType: { type: DataTypes.ENUM({ values: Constants.user.userType.values }), defaultValue: UserType.USER },
  dCreatedAt: { type : DataTypes.DATE },
  dUpdatedAt: { type : DataTypes.DATE }
}, {
  sequelize: sequelize.sequelize,
  createdAt: Constants.tableDetails.userBalance.createdAtFieldName,
  updatedAt: Constants.tableDetails.userBalance.updatedAtFieldName,
  tableName: Constants.tableDetails.userBalance.tableName,
  indexes: [
    {
      fields: Constants.tableDetails.userBalance.indexedField.fields
    }
  ]
})

export default UserBalance;
