import { Transaction } from 'sequelize';

import PassbookDao from './userProfile/passbook';
import UserBalanceDao from './userProfile/userBalance';
import StatisticsDao from './statistics/statistics';
import { AccountOpeningDataSchema } from '@/interfaces/userProfile/account';
import sequelize from '@/connections/database/mysql/mysql';
import { handleCatchError } from '@/helpers/utility';

export default class TransactionalDao {
    public openAccount = async (data: AccountOpeningDataSchema) => {
        const passbookDao = new PassbookDao();
        const userBalanceDao = new UserBalanceDao();
        const statisticsDao = new StatisticsDao();
        try {
            await sequelize.sequelize.transaction({
                isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
            }, async (t) => {
                await Promise.all([
                    passbookDao.createPassbook(data, t),
                    userBalanceDao.createUserBalance(data, t),
                    statisticsDao.createStatistics(data)
                ])
            })
            return { isSuccess: true }
        } catch (e) {
            handleCatchError(e)
            return { isSuccess: false }
        }
    }
}
