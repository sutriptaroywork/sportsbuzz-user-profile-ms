import { ObjectId } from 'mongodb';

import StatisticsModel, { StatisticsModelInputUid, StatisticsModelOutput } from '@/models/game/statistics';
import BaseMongoDao from '../baseMongoDao';
import { AccountOpeningDataSchema } from '@/interfaces/userProfile/account';

export default class StatisticsDao extends BaseMongoDao<StatisticsModelInputUid, StatisticsModelOutput> {
    constructor() {
      super(StatisticsModel);
    }
  
    public createStatistics = async (data: AccountOpeningDataSchema) => {
      const { iUserId } = data;
      const statisticsCreationObj = { iUserId: new ObjectId(iUserId) }
      const result = this.create(statisticsCreationObj);
      return result;
    }

    public getStatisticsByUserId = async (filter: object, output: object) => {
      const userStatistics = await this.findOneWithFields(filter, output)
      return userStatistics;
    }
}
