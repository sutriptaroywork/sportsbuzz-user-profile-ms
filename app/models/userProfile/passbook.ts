import { DataTypes, Model, Optional } from 'sequelize';

import sequelize from '@/connections/database/mysql/mysql';
import { PassbookAttributes } from '@/interfaces/userProfile/passBook';
import Constants from '@/configs/constants';

import { UserType } from '@/enums/userProfileType/userCommon';
import { PassbookType, PassbookStatus } from '@/enums/passbookType/passbookCommon';
import { TransactionType } from '@/enums/transactionType/transactionCommon';

export interface PassbookInput extends Omit<PassbookAttributes, 'id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface PassbookOuput extends Required<PassbookAttributes> {}

class Passbook extends Model<PassbookAttributes, PassbookInput> implements PassbookAttributes {
    public id!: number;
    public iUserId!: string;
    public nAmount: number;
    public nBonus: number;
    public nCash: number;
    public nOldWinningBalance: number;
    public nOldDepositBalance: number;
    public nOldTotalBalance: number;
    public nNewWinningBalance: number;
    public nNewDepositBalance: number;
    public nNewTotalBalance: number;
    public nOldBonus: number;
    public nNewBonus: number;
    public eTransactionType: TransactionType;
    public dBonusExpiryDate: Date;
    public bIsBonusExpired: boolean;
    public bCreatorBonusReturn: boolean;
    public bWinReturn: boolean;
    public iPreviousId: number;
    public iUserLeagueId: string;
    public iMatchId: string;
    public iMatchLeagueId: string;
    public iSeriesId: string;
    public iCategoryId: string;
    public sPromocode: string;
    public iTransactionId: string;
    public iUserDepositId: string;
    public iWithdrawId: string;
    public nWithdrawFee: number;
    public sRemarks: string;
    public sCommonRule: string;
    public eUserType: UserType;
    public eStatus!: PassbookStatus;
    public eType: PassbookType;
    public nLoyaltyPoint: number;
    public eCategory: string;
    public dActivityDate: Date;
    public dProcessedDate: Date;
    public dCreatedAt: Date;
    public dUpdatedAt: Date;
}

Passbook.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  iUserId: { type: DataTypes.STRING(24), allowNull: false },
  nAmount: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nBonus: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nCash: { type: DataTypes.FLOAT(12, 2), allowNull: false, defaultValue: 0 },
  nOldWinningBalance: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nOldDepositBalance: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nOldTotalBalance: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nNewWinningBalance: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nNewDepositBalance: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nNewTotalBalance: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nOldBonus: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  nNewBonus: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  eTransactionType: { type: DataTypes.ENUM({ values: Constants.transactionType.values }), defaultValue: TransactionType.DEPOSIT },
  dBonusExpiryDate: { type: DataTypes.DATE },
  bIsBonusExpired: { type: DataTypes.BOOLEAN, defaultValue: false },
  bCreatorBonusReturn: { type: DataTypes.BOOLEAN, defaultValue: false }, // we'll check this flag after win return process we again win distribution time
  bWinReturn: { type: DataTypes.BOOLEAN, defaultValue: false }, // we'll check this flag after win return process we again win distribution time
  iPreviousId: { type: DataTypes.INTEGER },
  iUserLeagueId: { type: DataTypes.STRING(24) },
  iMatchId: { type: DataTypes.STRING(24) },
  iMatchLeagueId: { type: DataTypes.STRING(24) },
  iSeriesId: { type: DataTypes.STRING },
  iCategoryId: { type: DataTypes.STRING },
  sPromocode: { type: DataTypes.STRING },
  iTransactionId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true }, // allowNull: false },
  iUserDepositId: { type: DataTypes.STRING(24) },
  iWithdrawId: { type: DataTypes.STRING(24) },
  nWithdrawFee: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  sRemarks: { type: DataTypes.TEXT },
  sCommonRule: { type: DataTypes.STRING },
  eUserType: { type: DataTypes.ENUM({ values: Constants.user.userType.values }), defaultValue: UserType.USER },
  eStatus: { type: DataTypes.ENUM({ values: Constants.passbookStatus.values }), defaultValue: PassbookStatus.COMPLETE },
  eType: { type: DataTypes.ENUM({ values: Constants.passbookType.values }), defaultValue: PassbookType.DR },
  nLoyaltyPoint: { type: DataTypes.FLOAT(12, 2), defaultValue: 0 },
  eCategory: { type: DataTypes.STRING },
  dActivityDate: { type: DataTypes.DATE },
  dProcessedDate: { type: DataTypes.DATE },
  dCreatedAt: { type : DataTypes.DATE },
  dUpdatedAt: { type : DataTypes.DATE }
}, {
  sequelize: sequelize.sequelize,
  createdAt: Constants.tableDetails.passbook.createdAtFieldName,
  updatedAt: Constants.tableDetails.passbook.updatedAtFieldName,
  tableName: Constants.tableDetails.passbook.tableName,
  indexes: [
    {
      fields: Constants.tableDetails.passbook.indexedField_1.fields
    },
    {
      fields: Constants.tableDetails.passbook.indexedField_2.fields,
      name: Constants.tableDetails.passbook.indexedField_2.name,
      unique: true
    }
  ]
})

export default Passbook;
