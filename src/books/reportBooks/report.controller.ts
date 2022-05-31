import { Controller, Get, Query, Response, StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
import { join } from "path";
import { ReportBookService } from "./report.service";

/* csv reader and writer */
// https://stackabuse.com/reading-and-writing-csv-files-with-node-js/

/* Link: http://localhost:3000/api.books/report?maxYear=4000&minYear=1000 */
@Controller('')
export class ReportBookController {

    constructor(private reportService: ReportBookService) { }

    @Get()
    async getFile(@Query() query, @Response({ passthrough: true }) res): Promise<StreamableFile> {
        const pathFolder = path.join(__dirname, '..', '..', '..', 'fileReport');
        console.log(query);
        const data = await this.reportService.getData([query.minYear, query.maxYear]);

        function checkFile() {
            return new Promise((resolve, reject) => {
                fs.access(path.join(pathFolder, 'fileReport.csv'), fs.F_OK, err => {
                    if (err) {
                        reject('file not exists')
                    }
                    resolve('file exists');
                })
            })
        }

        function createFile() {
            return new Promise((resolve, reject) => {
                fs.mkdir(pathFolder, err => {
                    if (err) {
                        reject('error create folder');
                    }
                    resolve('create folder successful');
                })
            })
        }

        function createCSVFile() {
            const csvWrite = createCsvWriter({
                path: path.join(pathFolder, 'fileReport.csv'),
                header: [
                    { id: 'title', title: 'Title' },
                    { id: 'year', title: 'Year' },
                    { id: 'author', title: 'Author' },
                    { id: 'isbn', title: 'Isbn' },
                ]
            })

            return csvWrite
                .writeRecords(data)
                .then(() => ('csv created'))
                .catch(() => 'csv not created')

        }

        function sendFile() {
            const file = createReadStream(join(pathFolder, 'fileReport.csv'));
            res.set({
                'Content-Type': 'application/json',
                'Content-Disposition': 'attachment; filename="report.csv"',
            });
            return new StreamableFile(file);
        }

        try {
            const check = await checkFile();
            console.log(check);
            if (check === 'file exists') {
                const writeFile = await createCSVFile();
                console.log(writeFile);
                if (writeFile === 'csv created') {
                    return sendFile();
                }
            }
        } catch (message) {
            if (message === 'file not exists') {
                try {
                    const checkDir = await createFile();
                    const writeFile = await createCSVFile();
                    console.log(writeFile);
                    if (writeFile === 'csv created') {

                        return sendFile();
                    }
                } catch (message) {
                    const writeFile = await createCSVFile();
                    console.log(writeFile);
                    if (writeFile === 'csv created') {

                        return sendFile();
                    }
                }
            }
            if (message === 'csv not created') {
                console.log(message);
            }
        }

        /*
        checkFile()
            .then((message) => {
                console.log(message);
                return Promise.reject('file exists from promise');
            })
            .then((message) => {
                console.log(message);
                createCSVFile();
            })
            .catch((message) => {
                if (message === 'file exists from promise') {
                    console.log(message);
                    createCSVFile();
                } else if (message === 'file not exists'){
                    createFile()
                        .then(message => {
                            console.log(1)
                            console.log(message);
                            createCSVFile();
                        })
                        .catch(message => {
                            console.log(2)
                            console.log(message);
                            createCSVFile();
                        })
                }  
            })
            .catch((message) => {
                console.log(message);
                console.log('error: create file');
            })

            console.log(123123)
            */
        //return sendFile();

    }
}