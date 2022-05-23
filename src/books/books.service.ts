import { Injectable } from "@nestjs/common";
import { getConnectionToken, InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Book, BookDocument } from "./schemas/books.schema";

@Injectable()
export class BooksService {

    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) { }

    async getAlldata(range) {
        const parseData = await this.bookModel.find().exec();
        const buf = [];
        for (let i = range[0]; i <= range[1]; i++) {
            if(i >= parseData.length){
                break;
            }
            buf.push(parseData[i]);
        }
        return [buf, parseData.length];
    }

    async getById(id) {
        const parseData = await this.bookModel.findById(id);
        return parseData;
    }

    async create(body) {
        const bodyReq = new this.bookModel(body);
        console.log(bodyReq)
        return await bodyReq.save();
    }

    async remove(id) {
        return this.bookModel.findByIdAndRemove(id);
    }

    async removeMany(list){
        console.log(list)
        const test = list.map(item => {
            return this.bookModel.findByIdAndRemove(item);
        })
        return Promise.all(test);
    }

    async edit(id, body) {
        return this.bookModel.findByIdAndUpdate(id, body, { new: true });
    }

}