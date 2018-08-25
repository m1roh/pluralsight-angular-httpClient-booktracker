import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Book} from '../models/book';
import {BookTrackerError} from '../models/bookTrackerError';
import {DataService} from './data.service';
import {Observable} from '../../../node_modules/rxjs';
import {catchError} from 'rxjs/operators';
import {of} from '../../../node_modules/rxjs/observable/of';

@Injectable()
export class BooksResolverService implements Resolve<Book | BookTrackerError>{

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book | BookTrackerError> | Promise<Book | BookTrackerError> | Book | BookTrackerError {
    return this.dataService.getAllBooks()
      .pipe(
        catchError(err => of(err))
      );
  }
}
