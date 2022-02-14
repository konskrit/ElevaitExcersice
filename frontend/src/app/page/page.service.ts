import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPage } from '../shared/models/page';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  findOne(id: string | null): Observable<IPage> {
    return this.http.get<IPage>(this.baseUrl + 'pages/' + id).pipe(
      map((page: IPage) => page)
    );
  }

  updateOne(id: string, page: IPage): Observable<IPage> {
    return this.http.put<IPage>(this.baseUrl + 'pages/' + id, page);
  }

  create(documentId: string, page: IPage): Observable<IPage> {
    return this.http.post<IPage>(this.baseUrl + 'pages/' + documentId, page);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + 'pages/' + id);
  }
}
