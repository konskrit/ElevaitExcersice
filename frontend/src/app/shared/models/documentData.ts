import { IDocument } from "./document";

export interface IDocumentData {
    data: IDocument[];
    total: number;
    page: number;
    limit: number;
    last_page: number;
}