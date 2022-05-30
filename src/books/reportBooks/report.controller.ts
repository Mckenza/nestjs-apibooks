import { Controller, Get, Query, Response, StreamableFile } from "@nestjs/common";
import { createReadStream, fstat } from "fs";
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
import { join } from "path";
import { ReportBookService } from "./report.service";


@Controller('')
export class ReportBookController {

    constructor(private reportService: ReportBookService) { }

    @Get()
    async getFile(@Response({ passthrough: true }) res): Promise<StreamableFile> {
        const pathfolder = path.join(__dirname, '..', '..', '..', 'fileReport', 'test.csv');
        const data = await this.reportService.getData([1000, 2000]);
        console.log(data);
        console.log(__dirname);

        // Промисификацию!!!
        fs.mkdir(pathfolder, (err) => {
            if (err) {
                console.log('error create file');
                //return;
            }
            console.log('folder create successful');

            const csvWrite = createCsvWriter({
                path: pathfolder,
                header: [
                    {id: 'title', title: 'Title'},
                    {id: 'year', title: 'Year'},
                    {id: 'author', title: 'Author'},
                    {id: 'isbn', title: 'Isbn'},
                ]
            })

            csvWrite
            .writeRecords(data)
            .then(() => console.log(123));
            /*
            const writeStream = fs.createWriteStream(path.resolve(pathfolder, 'reportJSON.csv'));
            data.forEach(item => writeStream.write(item))
            writeStream.end(() => {
                console.log('end write');
            });
            */
        })

        const file = createReadStream(join(process.cwd(), 'package.json'));
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="package.csv"',
        });
        return new StreamableFile(file);
    }
}