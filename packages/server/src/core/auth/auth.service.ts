import { Injectable, Logger } from "@nestjs/common"

// import data from "../../../../client/src/assets/data/data.json"
// import { AuthDto } from "./dto/auth.dto"

@Injectable()
export class AuthService {
    // private readonly PORTAL_API = ""

    private logger = new Logger(AuthService.name)

    constructor() {}

    // private async loginPortal(dto: AuthDto) {
    //     const response = await fetch(this.PORTAL_API + "/auth?without-save=true", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ login: dto.login, password: dto.password }),
    //     }).then((res) => res.json())

    //     console.log(response)
    // }
}
