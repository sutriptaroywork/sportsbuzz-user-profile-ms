import CommonRulesModel, { CommonRulesModelInput, CommonRulesModelOutput } from '@/models/statistics/commonRules';
import BaseMongoDao from '../baseMongoDao';
import { Status } from '@/enums/statusType/statusCommon'

export default class CommonRulesDao extends BaseMongoDao<CommonRulesModelInput, CommonRulesModelOutput> {
  constructor() {
    super(CommonRulesModel);
  }

  public findRuleDetailsByRuleType = async (rule: string): Promise<CommonRulesModelOutput> => {
    const result = this.findOne({ eRule: rule.toUpperCase(), eStatus: Status.ACTIVE });
    return result;
  }
}
