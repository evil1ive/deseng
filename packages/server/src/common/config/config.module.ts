import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"

import env from "@/config/env"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [env],
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class AppConfigModule {}
