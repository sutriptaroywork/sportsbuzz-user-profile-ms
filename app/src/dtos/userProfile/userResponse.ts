// import { IsBoolean, IsNumber, IsString, IsDate } from "class-validator";
// import { ObjectId } from "mongoose";

// export class UserProfileResponseDto {
//     @IsString()
//     public _id: ObjectId

//     @IsString()
//     public sName: string

//     @IsString()
//     public sUsername: string

//     @IsBoolean()
//     public bIsEmailVerified: boolean

//     @IsString()
//     public sMobNum: string

//     @IsBoolean()
//     public bIsMobVerified: boolean

//     @IsNumber()
//     public nLoyaltyPoints: number

//     @IsString()
//     public eStatus: string

//     @IsString()
//     public sReferCode: string

//     @IsString()
//     public sReferLink: string

//     @IsBoolean()
//     public bIsInternalAccount: boolean

//     @IsString()
//     public ePlatform: string

//     @IsBoolean()
//     public bIsKycApproved: boolean

//     @IsDate()
//     public dCreatedAt: string

//     @IsDate()
//     public dUpdatedAt: string

//     @IsNumber()
//     public nCurrentWinningBalance: number
    
//     @IsNumber()
//     public nCurrentDepositBalance: number
    
//     @IsNumber()
//     public nCurrentTotalBalance: number
    
//     @IsNumber()
//     public nCurrentBonus: number
    
//     @IsNumber()
//     public nExpiredBonus: number
    
//     @IsNumber()
//     public nTotalBonusEarned: number
    
//     @IsNumber()
//     public nTotalBonusReturned: number
    
//     @IsNumber()
//     public nTotalCashbackReturned: number
    
//     @IsNumber()
//     public nTotalWinningAmount: number
    
//     @IsNumber()
//     public nTotalDepositAmount: number
    
//     @IsNumber()
//     public nTotalDepositCount: number
    
//     @IsNumber()
//     public nTotalWithdrawAmount: number
    
//     @IsNumber()
//     public nTotalWithdrawCount: number
    
//     @IsNumber()
//     public nTotalLoyaltyPoints: number
// }

import { z } from 'zod'
import { ObjectId } from 'mongodb';

export const UserProfileUpdateResponseDto = z.object({
    _id: z.instanceof(ObjectId),
    sName: z.string(),
    sEmail: z.string().optional().nullable(),
    sUsername: z.string(),
    bIsEmailVerified: z.boolean().optional().nullable(),
    sMobNum: z.string().optional().nullable(),
    bIsMobVerified: z.boolean().optional().nullable(),
    nLoyaltyPoints: z.number().nullable(),
    eStatus: z.string(),
    sReferCode: z.string(),
    sReferLink: z.string(),
    bIsInternalAccount: z.boolean().optional().nullable(),
    ePlatform: z.string(),
    bIsKycApproved: z.boolean().optional().nullable(),
    dCreatedAt: z.date().optional().nullable(),
    dUpdatedAt: z.date().optional().nullable(),
    dDob: z.date().optional().nullable(),
    eGender: z.string().optional().nullable(),
    iCityId: z.number().optional().nullable(),
    iCountryId: z.number().optional().nullable(),
    iStateId: z.number().optional().nullable(),
    nPinCode: z.number().optional().nullable(),
    sAddress: z.string().optional().nullable(),
    sProPic: z.string().optional().nullable(),
    oSocial: z.object({
        sType: z.string().optional()
    }).optional(),
    bIsDeposit: z.boolean().optional().nullable()
})

export const UserProfileResponseDto = UserProfileUpdateResponseDto.extend({
    nCurrentWinningBalance: z.number().nullable(),
    nCurrentDepositBalance: z.number().nullable(),
    nCurrentTotalBalance: z.number().nullable(),
    nCurrentBonus: z.number().nullable(),
    nExpiredBonus: z.number().nullable(),
    nTotalBonusEarned: z.number().nullable(),
    nTotalBonusReturned: z.number().nullable(),
    nTotalCashbackReturned: z.number().nullable(),
    nTotalWinningAmount: z.number().nullable(),
    nTotalDepositAmount: z.number().nullable(),
    nTotalDepositCount: z.number().nullable(),
    nTotalWithdrawAmount: z.number().nullable(),
    nTotalWithdrawCount: z.number().nullable(),
    nTotalLoyaltyPoints: z.number().nullable(),
    nLeagueCreatorCom: z.number().nullable()
})
