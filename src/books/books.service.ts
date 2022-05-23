import { Injectable } from "@nestjs/common";
import { getConnectionToken, InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Book, BookDocument } from "./schemas/books.schema";

@Injectable()
export class BooksService {

    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) { }

    async getAlldata() {
        const parseData = await this.bookModel.find().exec();
        return parseData;
    }

    async getById(id) {
        const parseData = await this.bookModel.findById(id);
        return parseData;
    }

    async create(body) {
        const bodyReq = new this.bookModel(body);
        return bodyReq.save();
    }

    async remove(id) {
        console.log(123)
        return this.bookModel.findByIdAndRemove(id);
    }

    async edit(id, body) {
        return this.bookModel.findByIdAndUpdate(id, body, { new: true });
    }

}