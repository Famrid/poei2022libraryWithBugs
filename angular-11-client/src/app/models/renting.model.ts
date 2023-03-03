import { Book } from './book.model';

export class Renting {
  id: number;
  book: Book;
  user: any;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
}
