import UserProfileDao from '@/src/daos/userProfile/userProfile';
import { UserModelOutput } from '@/models/userProfile/userProfile';

export default class UserProfileService {
  private userProfileDao: UserProfileDao;

  constructor() {
    this.userProfileDao = new UserProfileDao();
  }

  public getUserProfileDetails = async (userId): Promise<UserModelOutput> => {
    const result: UserModelOutput = await this.userProfileDao.findUserById(userId);
    return result;
  }

  public kycApprovalCount = async (input: object) => {
    const result = await this.userProfileDao.kycApprovalCount(input);
    return result;
  }

  public findByIdAndUpdate = async (filter:any, data: any) => {
    const result = await this.userProfileDao.findByIdAndUpdate(filter, data);
    return result;
  }
}
