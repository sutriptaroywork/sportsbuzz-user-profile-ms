import { IsOptional, IsString, IsEnum, IsNotEmpty, MaxLength } from "class-validator";
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
export class UserDto extends BaseHeaders {
    @IsString()
    @IsNotEmpty()
    public user: string
}

export class CitieListDto extends BaseHeaders {
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
    @MaxLength(1)
    public eGender: string

    @IsOptional()
    public sProPic: string

    @IsOptional()
    public dDob: string

    @IsOptional()
    public sEmail: string

    @IsOptional()
    public nPinCode: number

    @IsOptional()
    public iCityId: number

    @IsOptional()
    public iStateId: number

    @IsOptional()
    public iCountryId: number

    @IsOptional()
    public sUsername: string

    @IsOptional()
    public sMobNum: number | string
}
