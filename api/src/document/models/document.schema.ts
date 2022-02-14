import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Page } from 'src/page/models/page.schema';
import { Document } from 'mongoose';

export type DocumentsDocument = Documents & Document;

@Schema()
export class Documents {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    dateCreated: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }] })
    pages: Page[];
}

export const DocumentSchema = SchemaFactory.createForClass(Documents);