import { Controller, Get, Query } from "@nestjs/common";


@Controller('')
export class ReportBookController{

    @Get()
    getReport(@Query() query){
        return 'test';
    }
}