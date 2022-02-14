import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IDocument } from '../shared/models/document';
import { IDocumentData } from '../shared/models/documentData';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  findOne(id: string | null): Observable<IDocument> {
    return this.http.get(this.baseUrl + 'documents/' + id).pipe(
      map((document: IDocument) => document)
    );
  }

  findAll(page?: number, limit?: number, s: string = ''): Observable<IDocumentData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));
    if (s !== '') {
      params = params.append('s', s);
    }

    return this.http.get<IDocumentData>(this.baseUrl + 'documents', {params}).pipe(
      map((documentData: IDocumentData) => documentData),
      catchError(error => throwError(error))
    );
  }

  updateOne(id: string, document: IDocument): Observable<IDocument> {
    return this.http.put(this.baseUrl + 'documents/' + id, document)
  }

  create(document: IDocument): Observable<IDocument> {
    return this.http.post<IDocument>(this.baseUrl + 'documents/', document);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + 'documents/' + id);
  }
}
