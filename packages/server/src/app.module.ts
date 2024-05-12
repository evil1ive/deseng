import { Module } from "@nestjs/common"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AppConfigModule } from "./common/config/config.module"
import { DatabaseModule } from "./common/database.module"
import { AuthModule } from "./core/auth/auth.module"
import { UserModule } from "./core/user/user.module"

@Module({
    imports: [AppConfigModule, DatabaseModule, UserModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
