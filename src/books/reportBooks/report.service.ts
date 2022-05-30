import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book, BookDocument } from "../schemas/books.schema";



@Injectable()
export class ReportBookService {

    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) { }

    async getData(query) {
        const dataFromBD = await this.bookModel.find({ $and: [{ year: { $gt: query[0] } }, { year: { $lt: query[1] } }] });
        return dataFromBD;
    }

}