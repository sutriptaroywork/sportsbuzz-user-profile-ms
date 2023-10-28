import { IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";
import { Transform } from 'class-transformer';

import { Status } from '@/enums/statusType/statusCommon';
import { BaseHeaders } from '../userProfile/userRequest';

export class PreSignedURLDto {
    @IsNotEmpty()
    public sFileName: string

    @IsNotEmpty()
    public sContentType: string
}

export class StateListDto extends BaseHeaders {
    @IsOptional()
    @IsString()
    @IsEnum(Status)
    @Transform(({ value }) => value.toUpperCase())
    public eStatus: Status
}
