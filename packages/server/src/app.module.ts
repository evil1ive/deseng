import { Module } from "@nestjs/common"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AppConfigModule } from "@/common/config/config.module"
import { DatabaseModule } from "@/common/database.module"

@Module({
    imports: [AppConfigModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
