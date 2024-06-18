import { Injectable, NestMiddleware } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NextFunction } from "express";
import * as jwt from 'jsonwebtoken'


@Injectable() 
export class JWTService{
    constructor(private config:ConfigService){}
    
    private accessTokenAge = 60*3;
    private refreshTokenAge = 60*60;

    async getTokens(login){
        const accessToken = jwt.sign({login}, this.config.get("ACCESS_SIGNATURE"), {
            expiresIn:`${this.accessTokenAge}s`
        })
        const refreshToken =jwt.sign({login}, this.config.get("REFRESH_SIGNATURE"), {
            expiresIn:`${this.refreshTokenAge}s`
        })
        return {accessToken,refreshToken}
    }

    getRefreshTokenAge(){
        return this.refreshTokenAge
    }
}

@Injectable()
export class verifyAuthorizationMiddleware implements NestMiddleware {
    constructor(private config:ConfigService){}

    use(req, res, next:NextFunction){
        const token = req.headers?.authorization ? req.headers.authorization.split(" ")[1]:"";

        if(!token){
            return res.sendStatus(401)
        }

        try{
            const decoded = jwt.verify(token, this.config.get("ACCESS_SIGNATURE"));
            req.user = decoded;
        
        } catch(e) {
            return res.sendStatus(401)
        }
        next();
    }
}


@Injectable()
export class verifyRefreshTokenMiddleware implements NestMiddleware {
    constructor(private config:ConfigService){}

    use(req, res, next:NextFunction){
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.sendStatus(401)
        }

        try{
            const decoded = jwt.verify(refreshToken, this.config.get("REFRESH_SIGNATURE"));
            req.user = decoded;
        } catch(e) {
            return res.sendStatus(401)
        }
        next();
    }
}
