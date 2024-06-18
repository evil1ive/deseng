import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"

import env from "@/config/env"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [env],
            envFilePath: `.env`,
            isGlobal: true,
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class AppConfigModule {}
