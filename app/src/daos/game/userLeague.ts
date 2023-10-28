import UserLeagueModel, { UserLeagueModelInput, UserLeagueModelOutput } from '@/models/game/userLeague';
import BaseMongoDao from '../baseMongoDao';

export default class UserLeagueDao extends BaseMongoDao<UserLeagueModelInput, UserLeagueModelOutput> {
    constructor() {
        super(UserLeagueModel);
    }

    public updateMultiple = async (filter: any, update: any) => {
        const result = await this.updateMany(filter, update);
        return result;
    }
}
