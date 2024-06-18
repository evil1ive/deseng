import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class StudyDirections {

    @Prop({ unique:true, required:true })
    directionName:string

    @Prop({ unique:true, required:true })
    directionDescription:string
    
    @Prop({ unique:true, required:true })
    directionTranslate:string
}

export const directionOfStudySchema = SchemaFactory.createForClass(StudyDirections);