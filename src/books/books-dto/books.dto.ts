import { IsNotEmpty, Matches, IsNumber, IsAlpha } from "class-validator";

export class BooksDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsNumber()

    year: number;

    @IsNotEmpty()
    @IsAlpha()
    author: string;

    @Matches(/\d{3}-\d-\d\d-\d{6}-\d/)
    isbn: string;
}