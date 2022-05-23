import { Body, Controller, Delete, Dependencies, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BooksService } from "./books.service";

@Controller('api.books')
export class BooksController{

    constructor(private booksService: BooksService){
    }

    // Декораторы

    @Get()
    getAllData(){
        return this.booksService.getAlldata();
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
        return this.booksService.remove(JSON.parse(query.filter).id[0]);
    }

    @Put(':id')
    editBook(@Body() body, @Param('id') id){
        console.log(4);
        return this.booksService.edit(id, body);
    }
    
}