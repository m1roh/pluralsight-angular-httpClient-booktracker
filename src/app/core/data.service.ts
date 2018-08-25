import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

import { LoggerService } from './logger.service';

import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { Reader } from 'app/models/reader';

import { allReaders } from 'app/data';
import {OldBook} from '../models/oldBook';
import {catchError, map} from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import {ErrorObservable} from '../../../node_modules/rxjs/observable/ErrorObservable';


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

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this.http.get<Book[]>('/api/books')
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  getBookById(id: number): Observable<Book | BookTrackerError>  {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get<Book>(`/api/books/${id}`, {
      headers
    })
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  getOldBookById(id: number): Observable<OldBook | BookTrackerError> {
    return this.http.get<Book>(`/api/books/${id}`)
      .pipe(
        map(book => <OldBook>{
          bookTitle: book.title,
          year: book.publicationYear
        }),
        tap(classicBook => console.log(classicBook)),
        catchError(err => this.handleHttpError(err))
      )
  }

  addBook(newBook: Book): Observable<Book | BookTrackerError> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Book>('/api/books', newBook, { headers })
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  updateBook(updatedBook: Book): Observable<void | BookTrackerError> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, { headers })
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  deleteBook(bookID: number): Observable<void | BookTrackerError> {

    return this.http.delete<void>(`/api/books/${bookID}`)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  private  handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {

    const dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';

    return ErrorObservable.create(dataError);
  }
}
