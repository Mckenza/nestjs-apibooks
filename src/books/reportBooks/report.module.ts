import { Module } from "@nestjs/common";
import { ReportBookController } from "./report.controller";
import { ReportBookService } from "./report.service";


@Module({
    imports:[],
    providers: [ReportBookService],
    controllers: [ReportBookController],
})
export class ReportBookModule{}