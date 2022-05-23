import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookDocument = Book & Document;

@Schema()
export class Book{

    @Prop()
    title: string;

    @Prop()
    year: number;

    @Prop()
    author: []

    @Prop()
    isbn: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);