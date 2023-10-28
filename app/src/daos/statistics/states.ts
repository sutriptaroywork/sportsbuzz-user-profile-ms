import StatesModel, { StatesModelInput, StatesModelOutput, StatesModelOutputSelected } from '@/models/statistics/states';
import BaseMongoDao from '../baseMongoDao';

export default class StatesDao extends BaseMongoDao<StatesModelInput, StatesModelOutputSelected> {
    constructor() {
      super(StatesModel);
    }
  
    public getStatesListByStatus = async (filter: object, outputFields: object): Promise<StatesModelOutputSelected> => {
      const result = this.findWithSelectedFields(filter, outputFields);
      return result;
    }
}
