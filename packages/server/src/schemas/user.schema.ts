import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    @Prop({ unique:true, required:true })
    login:string

    @Prop({ unique:true, required:true })
    passwordHash:string
    
    @Prop({ unique:true, required:true })
    salt:string
    
    @Prop({ required:false })
    directionOfStudy?:Array<string>

}

export const userSchema = SchemaFactory.createForClass(User);