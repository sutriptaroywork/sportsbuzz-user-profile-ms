import StatesDao from '@/src/daos/statistics/states';
import { StatesModelOutputSelected } from '@/models/statistics/states';

export default class StatesService {
  private statesDao: StatesDao;

  constructor() {
    this.statesDao = new StatesDao();
  }

  public getStatesListByStatus = async (filter: object, outputFields: object): Promise<StatesModelOutputSelected> => {
    const result: StatesModelOutputSelected = await this.statesDao.getStatesListByStatus(filter, outputFields);
    return result;
  }
}
