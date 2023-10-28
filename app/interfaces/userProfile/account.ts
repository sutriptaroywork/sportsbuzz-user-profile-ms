import { UserType } from '@/enums/userProfileType/userCommon';

export interface AccountOpeningDataSchema {
    iUserId: string;
    sUsername: string;
    eUserType: UserType;
}
