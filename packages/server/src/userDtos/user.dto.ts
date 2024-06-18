import { IsString, IsNotEmpty } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    readonly login:string
    
    @IsNotEmpty()
    @IsString()
    readonly password:string
}
