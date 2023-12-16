import { MongooseModule } from "@nestjs/mongoose"
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            connectionName: "@deseng/server",
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
