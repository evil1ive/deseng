import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class additionalMaterial {

    @Prop({ required:true })
    materialName:string

    @Prop({ required:true })
    materialDescription:string
    
    @Prop({ unique:true, required:true })
    materialLink:string
}

export const additionalMaterialSchema = SchemaFactory.createForClass(additionalMaterial);