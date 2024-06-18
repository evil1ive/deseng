import { Body, Controller, Get, Param, Post, Put, Req, Res } from "@nestjs/common"
import { UserDto } from "./userDtos/user.dto"

import { AppService } from "./app.service"
import { UserDirectionsDto } from "./userDtos/userDiretionsStudy.dto"
import { Response } from "express"

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}


    @Get('logout')
    async Logout(@Res({passthrough:true}) response:Response){
        return await this.appService.Logout(response)
    }

    @Get('refresh')
    async Refresh(@Req() req, @Res({passthrough:true}) res ){
        return await this.appService.Refresh(req,res)
    }

    @Get('materials')
    async Materials(){
        return await this.appService.Materials()
    }

    @Get('dictionary')
    async Dictionary(){
        return await this.appService.Dictionary()
    }

    @Post('auth')
    async Auth(@Body() user:UserDto,@Res({passthrough:true}) response:Response){
        return await this.appService.Auth(user,response)
    }

    @Post('registrate')
    async Registrate(@Body() user:UserDto,@Res({passthrough:true}) response:Response){
        return await this.appService.Registrate(user,response)
    }

    @Post('direction')
    async SetUserDirectionOfStudy(@Body() userDirections:UserDirectionsDto){
        return await this.appService.SetUserDirections(userDirections)
    }

    @Put('direction')
    async UpdateUserDirectionOfStudy(@Body() userDirections:UserDirectionsDto){
        return await this.appService.UpdateUserDirections(userDirections)
    }

}
 