import { IsOptional, IsString, IsNotEmpty, MaxLength } from "class-validator";
import { Transform } from 'class-transformer';

export class BaseHeaders {
    @IsOptional()
    public userlanguage: string

    @IsOptional()
    accept: any

    @IsOptional()
    'content-type': any

    @IsOptional()
    'content-length': any

    @IsOptional()
    language: any

    @IsOptional()
    'user-agent': any

    @IsOptional()
    host: any

    @IsOptional()
    connection: any
}

export class AdminDto extends BaseHeaders {
    @IsString()
    @IsNotEmpty()
    public admin: string
}

export class AdminProfile {
    @IsOptional()
    public start: string

    @IsOptional()
    public limit: string

    @IsOptional()
    public order: string
    
    @IsOptional()
    public search: string
    
    @IsOptional()
    public mobile: number | string
    
    @IsOptional()
    public internalAccount: string
    
    @IsOptional()
    public email: string
    
    @IsOptional()
    public datefrom: string
    
    @IsOptional()
    public dateto: string
    
    @IsOptional()
    public isFullResponse: string

    @IsOptional()
    public sort: string

    @IsOptional()
    public sorting: string
}

export class AdminRecommendationDto extends BaseHeaders {
    @IsOptional()
    public sSearch: string

    @IsOptional()
    public nLimit: string
}

export class CitieListDto extends BaseHeaders {
    @IsOptional()
    public start: string

    @IsOptional()
    public limit: string

    @IsOptional()
    public sort: string

    @IsOptional()
    public order: string

    @IsOptional()
    public search: string

    @IsNotEmpty()
    @IsString()
    public nStateId: string
}

export class UpdateProfileDto {
    @IsOptional()
    @Transform(({ value }) => value.replace(/'/g, "\\'"))
    public sName: string

    @IsOptional()
    @Transform(({ value }) => value.replace(/'/g, "\\'"))
    public sAddress: string

    @IsOptional()
    public sUsername: string

    @IsOptional()
    public sProPic: string

    @IsOptional()
    @MaxLength(1)
    public eGender: string

    @IsOptional()
    public eStatus: string

    @IsOptional()
    public sReferCode: string

    @IsOptional()
    public dDob: string

    @IsOptional()
    public sEmail: string

    @IsOptional()
    public nPinCode: number

    @IsOptional()
    public sMobNum: number | string

    @IsOptional()
    public bIsInternalAccount: boolean

    @IsOptional()
    public iCityId: number

    @IsOptional()
    public iStateId: number

    @IsOptional()
    public iCountryId: number
}
