import { Model } from "mongoose"

import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { User, UserDocument } from "@/core/user/entity/user.entity"

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    findById(id: number): Promise<UserDocument> {
        return this.userModel.findOne({ _id: id })
    }

    create(id: number) {
        return this.userModel.create({ _id: id })
    }
}
