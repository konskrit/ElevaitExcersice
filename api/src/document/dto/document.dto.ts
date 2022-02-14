import { IsNotEmpty } from "class-validator";

export class DocumentDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    dateCreated: Date;
}