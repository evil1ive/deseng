import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (service: ConfigService) => {
                return {
                    uri: service.get("mongodb_uri"),
                }
            },
        }),
    ],
})
export class DatabaseModule {}
