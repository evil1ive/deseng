import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AppConfigModule } from "./common/config/config.module"
import { DatabaseModule } from "./common/database.module"
import { MongooseModule } from "@nestjs/mongoose"
import { User, userSchema } from "./schemas/user.schema"
import { StudyDirections, directionOfStudySchema } from "./schemas/studyDirections.schema"
import { JWTModule } from "./common/jwt.module"
import { verifyAuthorizationMiddleware, verifyRefreshTokenMiddleware } from "./config/jwt.service"
import { additionalMaterial, additionalMaterialSchema } from "./schemas/additionalMaterial"
import { dictionary, dictionarySchema } from "./schemas/dictionary"

@Module({
    imports: [AppConfigModule, DatabaseModule, JWTModule, MongooseModule.forFeature([
        {
            name:User.name,
            schema:userSchema,  
        }
    ]), MongooseModule.forFeature([
        {
            name: StudyDirections.name,
            schema: directionOfStudySchema,
        }
    ]), MongooseModule.forFeature([
        {
            name: additionalMaterial.name,
            schema: additionalMaterialSchema,
        }
    ]), MongooseModule.forFeature([
        {
            name: dictionary.name,
            schema: dictionarySchema,
        }
    ])],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(verifyAuthorizationMiddleware)
        .exclude(
            { path:'refresh', method: RequestMethod.GET },
            { path: 'logout', method: RequestMethod.GET },
            { path: 'auth', method: RequestMethod.POST },
            { path: 'registrate', method: RequestMethod.POST }
          )
          .forRoutes(AppController);
        consumer.apply(verifyRefreshTokenMiddleware)
        .forRoutes({ path: 'refresh', method: RequestMethod.GET });      
    }
}
