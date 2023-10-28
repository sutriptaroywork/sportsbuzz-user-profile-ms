import SeriesLBUserRankDao from '@/src/daos/seriesLB/seriesLBUserRank';

export default class SeriesLBUserRankService {
  private seriesLBUserRankDao: SeriesLBUserRankDao;

  constructor() {
    this.seriesLBUserRankDao = new SeriesLBUserRankDao();
  }

  public updateMultiple = async (filter: any, update: any) => {
    const result = await this.seriesLBUserRankDao.updateMultiple(filter, update);
    return result;
  }
}
