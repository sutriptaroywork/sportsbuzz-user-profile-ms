import UserBalance from '@/models/userProfile/userBalance';
import { AccountOpeningDataSchema } from '@/interfaces/userProfile/account';
import { UserBalanceCreateSchema } from '@/interfaces/userProfile/userBalance';

export default class UserBalanceDao {
  model: any;

  constructor() {
    this.model = UserBalance;
  }

  public getUserBalanceByUserId = async (userId: string) => {
    const userBalance = await this.model.findOne({ where: { iUserId: userId.toString() }, raw: true })
    return userBalance;
  }

  public createUserBalance = async (data: AccountOpeningDataSchema, t) => {
    const { iUserId, eUserType } = data;
    const userBalanceObj: UserBalanceCreateSchema = {
      iUserId,
      eUserType
    };
    this.model.create(userBalanceObj, { transaction: t, lock: true });
  }
}
