import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Renting } from '../models/renting.model';

const API_URL = 'http://localhost:8080/api/renting';

@Injectable({
  providedIn: 'root'
})
export class RentingService {
  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Renting[]> {
    return this.http.get(API_URL + '/all').pipe(map(response => {
        return plainToClass(Renting, response as Renting[]);
      }
    ));
  }

  public getAllByUser(): Observable<Renting[]> {
    return this.http.get(API_URL + '/allByUser').pipe(map(response => {
        return plainToClass(Renting, response as Renting[]);
      }
    ));
  }

  public save(renting: Renting): Observable<Renting> {
    return this.http.post(API_URL, renting)
      .pipe(map(response => {
          return plainToClass(Renting, response as Renting);
        }
      ));

  }


}
