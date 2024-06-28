import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { typeDTO } from 'src/app/models/type/typeDTO';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<typeDTO[]> {
    return this.http.get<typeDTO[]>(`${this.url}/api/types`);
  }

  addType(type: typeDTO): Observable<any> {
    return this.http.post<any>(`${this.url}/api/types`, type);
  }

  deleteType(idType: string): Observable<any> {
    return this.http.delete<typeDTO>(`${this.url}/api/types/${idType}`);
  }

  updateType(type: typeDTO): Observable<any> {
    const { ID_type, ...bodyType } = type;
    return this.http.put<typeDTO>(`${this.url}/api/types/${ID_type}`, bodyType);
  }
}
