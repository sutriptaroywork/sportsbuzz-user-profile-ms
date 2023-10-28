import { ObjectId } from 'mongodb';

import { CommonRule, RuleType, RewardOn } from '@/enums/statisticsType/commonRules';
import { Status } from '@/enums/statusType/statusCommon';

export interface CommonRulesAttributes {
    _id: ObjectId;
    eRule: CommonRule;
    sRuleName: string;
    sDescription: string;
    nAmount: number;
    eType: RuleType;
    nMax: number;
    nMin: number;
    eStatus: Status;
    nExpireDays: number;
    sExternalId: string;
    sRewardOn: RewardOn;

    dCreatedAt: Date;
    dUpdatedAt: Date;
}
