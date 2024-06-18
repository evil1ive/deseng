import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common"
import { UserDto } from "./userDtos/user.dto"
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { UserDirectionsDto } from "./userDtos/userDiretionsStudy.dto";
import { StudyDirections } from "./schemas/studyDirections.schema";
import { additionalMaterial } from "./schemas/additionalMaterial"
import { dictionary } from "./schemas/dictionary"

import { JWTService } from "./config/jwt.service";
import * as bcrypt from 'bcrypt'
import { Response } from "express";


@Injectable()
export class AppService {
    constructor(@InjectModel(User.name) private userModel:Model<User>, @InjectModel(StudyDirections.name) private directionsOfStudy:Model<StudyDirections>, @InjectModel(additionalMaterial.name) private additionalMaterial:Model<additionalMaterial>, @InjectModel(dictionary.name) private dictionary:Model<dictionary>, private jwtModule:JWTService)
    {}

    async Logout(response:Response) {
        response.cookie("refreshToken", "", {
            httpOnly:true,
            maxAge: 0,
            sameSite:false,
            
        })
        response.sendStatus(200);
    }

    async Refresh(req,res:Response) {
        const result = await this.jwtModule.getTokens(req.user.login);
        const takenUser = await this.userModel.findOne({login:req.user.login});
        if(takenUser){
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                maxAge: this.jwtModule.getRefreshTokenAge()*1000,
                sameSite:'strict',
                secure:true
            })
            return {accessToken: result.accessToken, user:takenUser.login }
        }
        else{
            throw new NotFoundException('Bad user');
        }
        
    }

    async Auth(user:UserDto,response:Response) {
        const takenUser = await this.userModel.findOne({login:user.login});
        if(takenUser){
            if(takenUser.passwordHash===await bcrypt.hash(user.password,takenUser.salt)) {
                const result = await this.jwtModule.getTokens(user.login);
                response.cookie("refreshToken", result.refreshToken, {
                    httpOnly:true,
                    maxAge: this.jwtModule.getRefreshTokenAge()*1000,
                    sameSite:'strict',
                    secure:true
                })
                 
                return { accessToken: result.accessToken, user:takenUser.login }; 
                
            }  
            else {throw new NotFoundException('Bad password')}
        }
        else{
            throw new NotFoundException('User not found');
        }
    }


    async Registrate(user:UserDto, response:Response) {
        const checkUser = await this.userModel.findOne({login:user.login})
        let result;
        if(!checkUser){
            try{
                const salt = await bcrypt.genSalt(10);
                const pshash = await  bcrypt.hash(user.password, salt);

                const newUser =  new this.userModel({login:user.login, salt:salt, passwordHash:pshash});  
                newUser.save();
                const result = await this.jwtModule.getTokens(user.login);
                response.cookie("refreshToken", result.refreshToken, {
                    httpOnly:true,
                    maxAge: this.jwtModule.getRefreshTokenAge()*1000,
                    sameSite:'strict',
                    secure:true
                })
                
                return { accessToken: result.accessToken, user:newUser.login };
                
            }
            catch{
                throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
            }
        }
        else{
            throw new HttpException('User with this login already exists', HttpStatus.BAD_REQUEST)
        }
        return result;
    }


    async SetUserDirections(userDirections:UserDirectionsDto) {
        let user = await this.userModel.findOne({login:userDirections.login})
        let result;
        try{
            await this.directionsOfStudy.find({_id:{ $in: userDirections.directionS }})            
            if(user){
                await this.userModel.updateOne({login:userDirections.login},{$addToSet:{directionOfStudy:{$each:userDirections.directionS}}})
                result = new HttpException('User directions are updated', HttpStatus.ACCEPTED)
                user = await this.userModel.findOne({login:userDirections.login})
            }
            else{
                throw new HttpException('User are not found', HttpStatus.NOT_FOUND)
            }
        }
        catch{
            throw new HttpException('Bad directions', HttpStatus.BAD_REQUEST)
        }
        return {result:result, directionOfStudy:user.directionOfStudy}
    }


    async UpdateUserDirections(userDirections:UserDirectionsDto) {
        const user = await this.userModel.findOne({login:userDirections.login})
        let result;
        try{
            await this.directionsOfStudy.find({_id:{ $in: userDirections.directionS }})
            if(user){
                await this.userModel.updateOne({login:userDirections.login},{$addToSet:{directionOfStudy:{$each:userDirections.directionS}}})
                result = new HttpException('User directions are updated', HttpStatus.ACCEPTED)
            }
            else{
                throw new HttpException('User are not found', HttpStatus.NOT_FOUND)
            }
        }
        catch{
             throw new HttpException('Bad directions', HttpStatus.BAD_REQUEST)
        }
        
        return {result:result, userDirections:user.directionOfStudy}
    }

    async Materials() {
        const materials = await this.additionalMaterial.find().find({},null)
        if(materials) {
            return {materials:materials}
        }
        else {
            throw new HttpException('Bad database', HttpStatus.BAD_REQUEST)
        }
    }

    async Dictionary() {
        const dictionary = await this.dictionary.find({},null)
        if(dictionary) {
            return {dictionary:dictionary}
        }
        else {
            throw new HttpException('Bad database', HttpStatus.BAD_REQUEST)
        }
    }

}
