import { IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    readonly login: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}
