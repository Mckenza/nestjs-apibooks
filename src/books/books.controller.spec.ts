import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { BooksDto } from "./books-dto/books.dto";
import { BooksController } from "./books.controller"
import { BooksModule } from "./books.module";
import { BooksService } from "./books.service";
import * as request from 'supertest';


describe('BooksControllerTest', () => {
    let app: INestApplication;
    let booksService: { create: () => {} }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [BooksModule],
        })
            .overrideProvider(BooksService)
            .useValue(booksService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();

    })

    describe('POST /admin', () => {
        it('/POST', (done) => {
            console.log(app)
            request(app)
                .post('/admin')
                .send({
                    title: 'asdf',
                    year: 2344,
                    author: 'asdfasdf',
                    isbn: '123-3-44-444444-1',
                })
                //.set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done();
                });

        })
    })

});



/*
import { Test, TestingModule } from "@nestjs/testing";
import { BooksDto } from "./books-dto/books.dto";
import { BooksController } from "./books.controller"
import { BooksService } from "./books.service";


describe('BooksController', () => {
    let booksController: BooksController;
    let booksService: BooksService;

    beforeAll(async () => {
        const ApiServece = {
            provide: BooksService,
            useFactory: () => ({
                create: jest.fn(() => {
                    return {
                        title: 'asdf',
                        year: 4324,
                        author: 'asdfasfd',
                        isbn: '123-3-44-444444-1',
                        _id: {},
                        __v: 0,
                    }
                }),
            })
        }

        const app: TestingModule = await Test.createTestingModule({
            controllers: [BooksController],
            providers: [BooksService, ApiServece],
        }).compile();

        booksService = app.get<BooksService>(BooksService);
        booksController = app.get<BooksController>(BooksController);

    })

    it('test', async () => {
        const dto = new BooksDto();
        dto.title = '';
        dto.year = 1234;
        dto.author = 'asdfsadf';
        dto.isbn = '333-1-2-333333333-1';

        expect(await booksController.setData(dto)).toBe({});
    })

    it('test2', async () => {
        const dto = new BooksDto();
        dto.title = 'qwerwqr';
        dto.year = 1234;
        dto.author = 'sadfg';
        dto.isbn = '333-1-2-333333-1';

        expect(await booksController.setData(dto)).toBe({});
    })





});
*/