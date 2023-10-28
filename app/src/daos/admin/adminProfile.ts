import UserModel, { UserModelInput, UserModelOutput } from '@/models/userProfile/userProfile';
import BaseMongoDao from '../baseMongoDao';

export default class AdminProfileDao extends BaseMongoDao<UserModelInput, UserModelOutput> {
    constructor() {
      super(UserModel);
    }

    public findUserListWithSorting = async (filter: object, output: object, sorting: object) => {
        const result = await this.findWithSelectedFields(filter, output, sorting);
        return result;
    }

    public findUserListWithSortingSkippingLimiting = async (filter: object, output: object, sorting: object, skiping: string | number, limiting: string | number) => {
        const result = await this.findWithSelectedFields(filter, output, sorting, Number(skiping), Number(limiting));
        return result;
    }

    public countAdminUser = async (filter: object) => {
        const result = await this.countDocument(filter);
        return result;
    }

    public findOneByQuery = async (filter: object) => {
        const result = await this.findOne(filter);
        return result;
    }

    public findOneWithSelectedFields = async (filter: object, output: object) => {
        const result = await this.findOneWithFields(filter, output);
        return result;
    }
    
    public findOneAndUpdateNoUpsert = async (filter: any, data: any) => {
        const result = await this.findOneAndUpdateInsert(filter, data);
        return result;
    }
}
