import { Body, Controller, Delete, Dependencies, Get, Header, Param, Post, Put, Query, Res } from "@nestjs/common";
import { query } from "express";
import { BooksService } from "./books.service";

@Controller('api.books')
export class BooksController{

    constructor(private booksService: BooksService){
    }

    // Декораторы

    @Get()
    async getAllData(@Query() query){
        const [data, length] = await this.booksService.getAlldata(JSON.parse(query.range));
        return [data, length];
    }

    @Get(':id')
    getOneBook(@Param('id') id){
        return this.booksService.getById(id);
    }

    // Почитать про DTO
    @Post()
    setData(@Body() body){
        return this.booksService.create(body);
    }

    @Delete(':id')
    deleteBook(@Param('id') id){
        return this.booksService.remove(id);
    }

    @Delete()
    deleteBooks(@Query() query){
        console.log(query);
        return this.booksService.removeMany(JSON.parse(query.filter).id);
    }

    @Put(':id')
    editBook(@Body() body, @Param('id') id){
        console.log(4);
        return this.booksService.edit(id, body);
    }
    
}