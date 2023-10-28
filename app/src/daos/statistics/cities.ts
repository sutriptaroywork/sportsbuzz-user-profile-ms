import CitiesModel, { CitiesModelInput, CitiesModelOutputSelected } from '@/models/statistics/cities';
import BaseMongoDao from '../baseMongoDao';
import Config from '@/configs/main';

export default class CitiesDao extends BaseMongoDao<CitiesModelInput, CitiesModelOutputSelected> {
    constructor() {
      super(CitiesModel);
    }
  
    public getCitiesListByState = async (filter: object, outputFields: object): Promise<CitiesModelOutputSelected> => {
      const result = this.findWithSelectedFields(filter, outputFields);
      return result;
    }

    public getCitiesListByStateForAdmin = async (nStateId: number, start: number, limit: number) => {
      const result = await this.model.aggregate([
        {
          $match: {
            nStateId: nStateId
          }
        },
        {
          $group: {
            _id: 0,
            count: {
              $sum: 1
            },
            document: {
              $push: '$$ROOT'
            }
          }
        },
        {
          $unwind: '$document'
        },
        { $limit: start + limit },
        { $skip: start },
        {
          $group: {
            _id: 0,
            total: {
              $first: '$count'
            },
            results: {
              $push: {
                sName: { $ifNull: ['$document.sName', ''] }
              }
            }
          }
        }
      ]).allowDiskUse(Config.bAllowDiskUse).exec()
      return result;
    }
}
