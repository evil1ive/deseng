import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
    try{
        
        const app = await NestFactory.create(AppModule)
        const config = app.get(ConfigService)
        app.useGlobalPipes(new ValidationPipe())
        app.use(cookieParser())
        app.enableCors({credentials:true, origin:true})
        await app.listen(config.get("port"))
    }
    catch(e){
        console.log(e)
    }
}

bootstrap()
