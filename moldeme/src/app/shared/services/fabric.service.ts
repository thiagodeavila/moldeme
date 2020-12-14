import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFabricItem, IFabricItems } from '../model/fabric.model';

@Injectable()
export class FabricService {

    private apiBaseUrl = 'https://recrutamento.molde.me/fabric';
    private authToken = JSON.parse(localStorage.getItem('authToken'));
    private headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.authToken.auth_token
        })
    };

    constructor(private http: HttpClient) { }

    get(): Observable<IFabricItems> {
        return this.http.get<IFabricItems>(this.apiBaseUrl, this.headers);
    }

    create(model: IFabricItem): Observable<IFabricItem> {
        return this.http.post<IFabricItem>(this.apiBaseUrl, model, this.headers);
    }

    update(id: number): Observable<IFabricItem> {
        return this.http.put<IFabricItem>(`${this.apiBaseUrl}/${id}`, this.headers);
    }

    delete(id: number): Observable<IFabricItem> {
        return this.http.delete<IFabricItem>(`${this.apiBaseUrl}/${id}`, this.headers);
    }
}
