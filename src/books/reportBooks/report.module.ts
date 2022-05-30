import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "../schemas/books.schema";
import { ReportBookController } from "./report.controller";
import { ReportBookService } from "./report.service";


@Module({
    imports:[
        MongooseModule.forFeature([
            { name: Book.name, schema: BookSchema }
        ]),
    ],
    providers: [ReportBookService],
    controllers: [ReportBookController],
})
export class ReportBookModule{}