import CommonRulesDao from '@/src/daos/statistics/commonRules';
import { CommonRulesModelOutput } from '@/models/statistics/commonRules';


export default class CommonRuleService {
  private commonRulesDao: CommonRulesDao;

  constructor() {
    this.commonRulesDao = new CommonRulesDao();
  }

  public getRuleDetails = async (rule: string): Promise<CommonRulesModelOutput> => {
    const result: CommonRulesModelOutput = await this.commonRulesDao.findRuleDetailsByRuleType(rule);
    return result;
  }
}
