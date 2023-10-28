import { Schema } from 'mongoose';

import { StatisticsDBConnect } from '@/connections/database/mongodb/mongodb';
import { CommonRulesAttributes } from '@/interfaces/statistics/commonRules';
import Constants from '@/configs/constants';

import { CommonRule, RuleType, RewardOn } from '@/enums/statisticsType/commonRules';
import { Status } from '@/enums/statusType/statusCommon';

export interface CommonRulesModelInput extends Omit<CommonRulesAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface CommonRulesModelOutput extends Required<CommonRulesAttributes> {}

const CommonRuleSchema = new Schema<CommonRulesAttributes>(
    {
        eRule: {
            type: String,
            enum: CommonRule, // RB = REGISTER_BONUS, RCB = REFER_CODE_BONUS, RR = REGISTER_REFER, DB = DEPOSIT_BONUS, PLC = PRIVATE_LEAGUE_COMMISSION, LCC =LEAGUE_CREATOR_COMMISSION, LCG = LEAGUE_CREATOR_GST
            required: true,
            unique: true
        },
        sRuleName: { type: String, trim: true },
        sDescription: { type: String },
        nAmount: { type: Number, required: true },
        eType: {
            type: String,
            enum: RuleType, // C = CASH, B = BONUS, D = DEPOSIT
            required: true
        },
        nMax: { type: Number },
        nMin: { type: Number },
        eStatus: {
            type: String,
            enum: Status,
            default: Status.INACTIVE
        },
        nExpireDays: { type: Number },
        sExternalId: { type: String },
        sRewardOn: {
            type: String,
            enum: RewardOn
        }
    },
    { timestamps: { createdAt: Constants.tableDetails.commonRules.createdAtFieldName, updatedAt: Constants.tableDetails.commonRules.updatedAtFieldName } }
)
CommonRuleSchema.index({ eStatus: 1, eRule: 1 })

const CommonRulesModel = StatisticsDBConnect.model(Constants.tableDetails.commonRules.tableName, CommonRuleSchema)
export default CommonRulesModel;
