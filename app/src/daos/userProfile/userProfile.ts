import UserModel, { UserModelInput, UserModelOutput } from '@/models/userProfile/userProfile';
import BaseMongoDao from '../baseMongoDao';

export default class UserProfileDao extends BaseMongoDao<UserModelInput, UserModelOutput> {
  constructor() {
    super(UserModel);
  }

  public findUserById = async (userId: string): Promise<UserModelOutput> => {
    const result: UserModelOutput = await this.findById(userId);
    return result;
  }

  public kycApprovalCount = async (filter: object) => {
    const result = await this.countDocument(filter);
    return result;
  }

  public findByIdAndUpdate = async (filter:any, data: any) => {
    const result = await this.findOneAndUpdateInsert(filter, data);
    return result;
  }
}
