import Passbook from '@/models/userProfile/passbook';
import { AccountOpeningDataSchema } from '@/interfaces/userProfile/account';
import { PassbookCreateSchema } from '@/interfaces/userProfile/passBook';
import { TransactionType } from '@/enums/transactionType/transactionCommon';
import { PassbookType } from '@/enums/passbookType/passbookCommon';

export default class PassbookDao {
  model: any;

  constructor() {
    this.model = Passbook;
  }

  public createPassbook = async (data: AccountOpeningDataSchema, t) => {
    const { iUserId, eUserType, sUsername } = data;
    const passbookObj: PassbookCreateSchema = {
        iUserId: iUserId.toString(),
        eUserType,
        eTransactionType: TransactionType.OPENING,
        eType: PassbookType.CR,
        sRemarks: `${sUsername} Initial Account Opened`,
        dActivityDate: new Date()
    };
    this.model.create(passbookObj, { transaction: t, lock: true });
  }
}
