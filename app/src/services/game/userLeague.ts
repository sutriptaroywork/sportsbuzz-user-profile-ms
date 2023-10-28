import UserLeagueDao from '@/src/daos/game/userLeague';

export default class UserLeagueService {
  private userLeagueDao: UserLeagueDao;

  constructor() {
    this.userLeagueDao = new UserLeagueDao();
  }

  public updateMultiple = async (filter: any, update: any) => {
    const result = await this.userLeagueDao.updateMultiple(filter, update);
    return result;
  }
}
