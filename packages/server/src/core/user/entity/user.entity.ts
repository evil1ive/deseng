import { HydratedDocument } from "mongoose"

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false, versionKey: false })
class UserInfo {
    @Prop()
    first_name: string

    @Prop()
    last_name: string

    @Prop()
    avatar: string
}

const UserInfoSchema = SchemaFactory.createForClass(UserInfo)

@Schema({ _id: false })
export class User {
    @Prop()
    _id: number

    @Prop()
    level: string

    @Prop({ type: UserInfo, schema: UserInfoSchema, required: true })
    info: UserInfo
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)
