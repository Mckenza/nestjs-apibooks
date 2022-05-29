import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { ReportBookModule } from "./reportBooks/report.module";
import { Book, BookSchema } from "./schemas/books.schema";

@Module({
    imports: [
        ReportBookModule,
        MongooseModule.forFeature([
            { name: Book.name, schema: BookSchema }
        ]),
    ],
    providers: [BooksService],
    controllers: [BooksController],
})
export class BooksModule {

}
