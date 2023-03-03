import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { BookService } from '../_services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { AuthorService } from '../_services/author.service';
import { RentingService } from '../_services/renting.service';
import { Renting } from '../models/renting.model';

@Component({
  selector: 'app-rentings',
  templateUrl: './rentings-book.component.html',
  styleUrls: ['./rentings-book.component.css']
})
export class RentingsBookComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  books$: Observable<Book[]> | undefined;
  rentings$: Observable<Renting[]> | undefined;
  authors$: Observable<Author[]> | undefined;
  book = new Book();
  author = new Author();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private bookService: BookService, private rentingService: RentingService) {
  }

  ngOnInit(): void {
    this.listBooks();
    this.listRentings();
  }

  listBooks(byRecommendation= false): void {
    if(byRecommendation){
      this.books$ = this.bookService.getByRecommendations();
    } else {
      this.books$ = this.bookService.getAll();
    }

  }

  createRenting(book: Book): void {
    const renting = new Renting();
    renting.book = book;
    renting.user = this.tokenStorage.getUser();
    delete renting.user.roles;
    this.rentingService.save(renting).subscribe();
  }

  updateRenting(renting: Renting): void {
    renting.endDate = new Date();
    this.rentingService.save(renting).subscribe();
  }

  listRentings(): void {
    this.rentings$ = this.rentingService.getAllByUser();
  }
}
