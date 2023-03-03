import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

const API_URL = 'http://localhost:8080/api/books/';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Book[]> {
    return this.http.get(API_URL + 'all').pipe(map(response => {
        return plainToClass(Book, response as Book[]);
      }
    ));
  }

  public getByRecommendations(): Observable<Book[]> {
    return this.http.get(API_URL + 'recommendations').pipe(map(response => {
        return plainToClass(Book, response as Book[]);
      }
    ));
  }

  public create(book: Book): Observable<Book> {
    return this.http.post(API_URL, book)
      .pipe(map(response => {
          return plainToClass(Book, response as Book);
        }
      ));

  }


}
