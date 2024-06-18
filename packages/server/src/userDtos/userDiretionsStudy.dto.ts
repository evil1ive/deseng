import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UserDirectionsDto{

    @IsNotEmpty()
    @IsString()
    readonly login:string

    @IsNotEmpty()
    @IsArray()
    readonly directionS:Array<string>
    
}
