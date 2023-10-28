import { Schema } from 'mongoose';

import { UsersDBConnect } from '@/connections/database/mongodb/mongodb';
import { UserAttributes, UserStatics } from '@/interfaces/userProfile/userProfile';
import Constants from '@/configs/constants';

import { PlatformType } from '@/enums/platformType/platformCommon';
import { UserStatus } from '@/enums/userProfileType/userCommon';
import { UserType } from '@/enums/userProfileType/userCommon';

export interface UserModelInput extends Omit<UserAttributes, '_id' | 'dCreatedAt' | 'dUpdatedAt'> {}
export interface UserModelOutput extends Required<UserAttributes> {}

const UserSchema = new Schema<UserAttributes, UserStatics>(
  {
    sName: { type: String, trim: true },
    sUsername: { type: String, trim: true, required: true },
    sEmail: { type: String, trim: true },
    bIsEmailVerified: { type: Boolean, default: false },
    sMobNum: { type: String, trim: true, required: true },
    bIsMobVerified: { type: Boolean, default: false },
    sProPic: { type: String, trim: true },
    eType: { type: String, enum: Constants.user.userType, default: UserType.USER },
    eGender: { type: String, enum: Constants.user.userGender },
    aJwtTokens: [
      {
        sToken: { type: String },
        sPushToken: { type: String, trim: true },
        dTimeStamp: { type: Date, default: Date.now }
      }
    ],
    oSocial: {
      sType: { type: String, enum: Constants.socialType },
      sId: { type: String },
      sToken: { type: String }
    },
    nLoyaltyPoints: { type: Number, default: 0 },
    iCityId: { type: Number },
    iStateId: { type: Number },
    iCountryId: { type: Number },
    sState: { type: String },
    dDob: { type: Date },
    sCity: { type: String },
    sAddress: { type: String },
    nPinCode: { type: Number },
    aDeviceToken: { type: Array },
    eStatus: { type: String, enum: Constants.user.userStatus, default: UserStatus.ACTIVE },
    iReferredBy: { type: Schema.Types.ObjectId, ref: Constants.tableDetails.user.tableName },
    sReferCode: { type: String },
    sReferLink: { type: String },
    dLoginAt: { type: Date },
    dPasswordchangeAt: { type: Date },
    sPassword: { type: String, trim: true, default: null },
    sVerificationToken: { type: String },
    bIsInternalAccount: { type: Boolean, default: false },
    sExternalId: { type: String },
    sReferrerRewardsOn: { type: String },
    ePlatform: { type: String, enum: Constants.platform, required: true, default: PlatformType.OTHER },
    bIsKycApproved: { type: Boolean, default: false }
  },
  {
    timestamps: { createdAt: Constants.tableDetails.user.createdAtFieldName, updatedAt: Constants.tableDetails.user.updatedAtFieldName },
    statics: {
      filterData(user) {
        user.__v = undefined
        user.sVerificationToken = undefined
        user.aJwtTokens = undefined
        user.iReferredBy = undefined
        user.sPassword = undefined
        user.eType = undefined
        user.dUpdatedAt = undefined
        user.aDeviceToken = undefined
        return user
      }
    }
  }
);

UserSchema.index({ sReferCode: 1 })
UserSchema.index({ eType: 1 })
UserSchema.index({ 'oSocial.sId': 1 })
UserSchema.index({ sUserSchemaname: 1 }, { unique: true, sparse: true })
UserSchema.index({ sEmail: 1 })
UserSchema.index({ sMobNum: 1 }, { unique: true })
UserSchema.index({ dCreatedAt: 1 })
UserSchema.index({ eType: 1, aJwtTokens: 1 })
UserSchema.index({ eType: 1, _id: 1 })
UserSchema.index({ eType: 1, eGender: 1 })
UserSchema.index({ sName: 1 })
UserSchema.index({ eGender: 1 })

const UserModel = UsersDBConnect.model<UserAttributes, UserStatics>(Constants.tableDetails.user.tableName, UserSchema);

// UserModel.collection.dropIndexes();

UserModel.init().then(() => {
  console.log('complete initialization')
  UserModel.syncIndexes().then(() => {
    console.log('User Model Indexes Synced')
  }).catch((err) => {
    console.log('User Model Indexes Sync Error', err)
  })
}).catch((e) => {
  console.log('model initialization error', e)
})

export default UserModel;
