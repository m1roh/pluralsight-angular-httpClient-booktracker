import { Component, OnInit } from '@angular/core';

import { Book } from 'app/models/book';
import {DataService} from '../core/data.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: []
})
export class AddBookComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() { }

  saveBook(formValues: any): void {
    const newBook: Book = <Book>formValues;
    console.log(newBook);

    this.dataService.addBook(newBook)
      .subscribe(
        (data: Book) => console.log(data),
        (err: any) => console.error(err)
      )
  }

}
