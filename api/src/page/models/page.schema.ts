import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type PageDocument = Page & Document;

@Schema()
export class Page {
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop()
    pageNr: number;

    @Prop()
    text: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);