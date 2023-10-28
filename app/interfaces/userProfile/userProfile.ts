import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import { PlatformType } from '@/enums/platformType/platformCommon';
import { SocialMediaType } from '@/enums/socialMediaType/socialMediaCommon';
import { UserGender } from '@/enums/userProfileType/userCommon';
import { UserStatus } from '@/enums/userProfileType/userCommon';
import { UserType } from '@/enums/userProfileType/userCommon';

export interface UserAttributes {
  _id: ObjectId;
  sName: string;
  sUsername: string;
  sEmail: string;
  bIsEmailVerified: boolean;
  sMobNum: string;
  sPassword: string;
  bIsMobVerified: boolean;
  sProPic: string;
  eType: UserType;
  eGender: UserGender;
  aJwtTokens: [
    {
      sToken: string;
      sPushToken: string;
      dTimeStamp: Date;
    }
  ];
  oSocial: {
    sType: SocialMediaType;
    sId: string;
    sToken: string;
  };
  nLoyaltyPoints: number;
  iCityId: number;
  iStateId: number;
  iCountryId: number;
  sState: string; //should be enum
  dDob: Date;
  sCity: string;
  sAddress: string;
  nPinCode: number;
  aDeviceToken: any;
  eStatus: UserStatus;
  iReferredBy: ObjectId;
  sReferCode: string;
  sReferLink: string;
  dLoginAt: Date;
  dPasswordchangeAt: Date;
  sVerificationToken: string;
  bIsInternalAccount: boolean;
  sExternalId: string;
  sReferrerRewardsOn: string;
  ePlatform: PlatformType;
  bIsKycApproved: boolean;

  dCreatedAt: Date;
  dUpdatedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserStatics extends Model<UserAttributes> {
  filterData(user): any;
}

export interface UserFromRequest {
  _id: ObjectId;
}
