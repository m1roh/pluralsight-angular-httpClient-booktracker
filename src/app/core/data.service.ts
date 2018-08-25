import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

import { LoggerService } from './logger.service';

import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { Reader } from 'app/models/reader';

import { allBooks, allReaders } from 'app/data';
import {OldBook} from '../models/oldBook';
import {map} from 'rxjs/operators';
import {tap} from 'rxjs/operators';


@Injectable()
export class DataService {
  mostPopularBook: Book;

  constructor(private loggerService: LoggerService,
              private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book>  {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get<Book>(`/api/books/${id}`, {
      headers
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`)
      .pipe(
        map(book => <OldBook>{
          bookTitle: book.title,
          year: book.publicationYear
        }),
        tap(classicBook => console.log(classicBook))
      )
  }

  addBook(newBook: Book): Observable<Book> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Book>('/api/books', newBook, { headers })
  }

  updateBook(updatedBook: Book): Observable<void> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, { headers })
  }

  deleteBook(bookID: number): Observable<void> {

    return this.http.delete<void>(`/api/books/${bookID}`);
  }
}
