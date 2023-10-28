import { HttpException } from '@/library/HttpException/HttpException';
import { UserBalanceOuput } from '@/models/userProfile/userBalance';
import UserBalanceDao from '@/src/daos/userProfile/userBalance';
import Constants from '@/configs/constants';


export default class UserBalanceService {
  private userBalanceDao: UserBalanceDao;

  constructor() {
    this.userBalanceDao = new UserBalanceDao();
  }

  public getUserBalanceByUserId = async (userId: string) => {
    const userBalance: UserBalanceOuput = await this.userBalanceDao.getUserBalanceByUserId(userId)
    return userBalance;
  }
}
