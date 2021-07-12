import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: environment.token
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private url =  `${environment.backendURL}/customers/`;

  constructor(private http: HttpClient) { }

  getCustomer(id): Observable<Customer> {
    return this.http.get<Customer>(this.url + id, httpOptions);
  }
}

export interface Customer {
  _id: string;
  name: string;
  lastName: string;
  documentType: string;
  identificationNumber: string;
  email?: string;
  address?: string;
  phone?: string;
}
