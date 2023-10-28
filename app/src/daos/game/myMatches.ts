import MyMatchesModel, { MyMatchesModelInput, MyMatchesModelOutput } from '@/models/game/myMatches';
import BaseMongoDao from '../baseMongoDao';
import Config from '@/configs/main';

export default class MyMatchesDao extends BaseMongoDao<MyMatchesModelInput, MyMatchesModelOutput> {
    constructor() {
      super(MyMatchesModel);
    }
  
    public getTotalJoinedLeague = async (userId) => {
      const aTotalJoinLeague = await this.model.aggregate([
        { $match: { iUserId: userId } }, {
          $project: {
            count: { $cond: { if: { $isArray: '$aMatchLeagueId' }, then: { $size: '$aMatchLeagueId' }, else: 0 } }
          }
        }
      ]).allowDiskUse(Config.bAllowDiskUse).exec();
      return aTotalJoinLeague;
    }

    public getTotalMatches = async (filter: object) => {
      const aTotalJoinLeague = await this.countDocument(filter);
      return aTotalJoinLeague;
    }
}
