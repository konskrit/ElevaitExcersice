import { IPage } from "src/page/interfaces/page.interface";

export interface IDocument {
    id?: string;
    title?: string;
    author?: string;
    dateCreated?: Date;
    pages?: IPage[];
}