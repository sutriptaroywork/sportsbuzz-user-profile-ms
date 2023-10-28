import TransactionalDao from '@/src/daos/transactionalDao';
import { AccountOpeningDataSchema } from '@/interfaces/userProfile/account';

export default class AccountService {
    private transactionalDao: TransactionalDao;
  
    constructor() {
      this.transactionalDao = new TransactionalDao();
    }
  
    public openAccount = async (data: AccountOpeningDataSchema) => {
      const result = await this.transactionalDao.openAccount(data);
      return result;
    }
}
