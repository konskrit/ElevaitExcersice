import { IPage } from "./page";

export interface IDocument {
    id?: string;
    title?: string;
    author?: string;
    dateCreated?: string;
    pages?: IPage[];
}