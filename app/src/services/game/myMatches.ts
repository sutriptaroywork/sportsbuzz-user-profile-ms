import MyMatchesDao from '@/src/daos/game/myMatches';
import { CitiesModelOutputSelected } from '@/models/statistics/cities';

export default class MyMatchesService {
  private myMatchesDao: MyMatchesDao;

  constructor() {
    this.myMatchesDao = new MyMatchesDao();
  }

  public getTotalJoinedLeague = async (userId) => {
    const result = await this.myMatchesDao.getTotalJoinedLeague(userId);
    return result;
  }

  public getTotalMatches = async (filter: object) => {
    const result = await this.myMatchesDao.getTotalMatches(filter);
    return result;
  }
}
