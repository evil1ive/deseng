import { Module } from "@nestjs/common"

import { AppConfigModule } from "@/common/config/config.module"
import { DatabaseModule } from "@/common/database.module"
import { UserModule } from "@/core/user/user.module"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"

@Module({
    imports: [AppConfigModule, DatabaseModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
