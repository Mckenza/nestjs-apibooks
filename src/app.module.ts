import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { ReportBookModule } from './books/reportBooks/report.module';

@Module({
  imports: [
    BooksModule,
    RouterModule.register([
      {
        path: 'api.books',
        module: BooksModule,
        children: [
          {
            path: 'admin',
            module: BooksModule,
          },
          {
            path: 'report',
            module: ReportBookModule,
          },
        ],
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/books'),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
