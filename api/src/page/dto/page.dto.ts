import { IsNotEmpty } from "class-validator";

export class PageDto {
    pageNr: number;

    @IsNotEmpty()
    text: string;

}