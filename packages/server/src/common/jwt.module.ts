import { Module } from "@nestjs/common"
import { JWTService } from "@/config/jwt.service"
import { AppConfigModule } from "./config/config.module"

@Module({
    imports: [AppConfigModule],
    providers: [JWTService],
    exports: [JWTService],
})
export class JWTModule {}

