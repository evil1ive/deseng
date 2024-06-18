import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class dictionary {

    @Prop({ unique:true, required:true })
    word:string

    @Prop({ required:true })
    transcription:string
    
    @Prop({ required:true })
    translation:string
}

export const dictionarySchema = SchemaFactory.createForClass(dictionary);