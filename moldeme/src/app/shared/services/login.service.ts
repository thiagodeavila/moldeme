import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuth, ILoginForm } from '../model/login.model';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    private apiBaseUrl = 'https://recrutamento.molde.me/login';

    constructor(private http: HttpClient) { }

    post(model: ILoginForm): Observable<IAuth> {
        return this.http.post<IAuth>(this.apiBaseUrl, model);
    }
}
