import StatisticsDao from '@/src/daos/statistics/statistics';

export default class StatisticsService {
  private statisticsDao: StatisticsDao;

  constructor() {
    this.statisticsDao = new StatisticsDao();
  }

  public getStatisticsByUserId = async (filter, output) => {
    const result = await this.statisticsDao.getStatisticsByUserId(filter, output);
    return result;
  }
}
