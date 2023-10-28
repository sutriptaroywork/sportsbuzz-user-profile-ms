import SeriesLBUserRankModel, { SeriesLBUserRankModelInput, SeriesLBUserRankModelOutput } from '@/models/seriesLB/seriesLBUserRank';
import BaseMongoDao from '../baseMongoDao';

export default class SeriesLBUserRankDao extends BaseMongoDao<SeriesLBUserRankModelInput, SeriesLBUserRankModelOutput> {
    constructor() {
        super(SeriesLBUserRankModel);
    }

    public updateMultiple = async (filter: any, update: any) => {
        const result = await this.updateMany(filter, update);
        return result;
    }
}
