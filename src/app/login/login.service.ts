import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: environment.token
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogin: Boolean;

  private url =  `${environment.backendURL}/login`;

  constructor(private http: HttpClient) { }

  login(data): Observable<Login> {
    return this.http.post<Login>(this.url, data, httpOptions).pipe(
      tap(response => {
        this.isLogin = response.isLogin;
      })
    );
  }
}

interface Login {
  isLogin: boolean;
}

