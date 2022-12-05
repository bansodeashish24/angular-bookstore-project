import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: any;

  constructor() {}

  ngOnInit(): void {
    this.book = JSON.parse(localStorage.getItem('selectedBook')!);
  }

  goToBuyLink() {
    window.open(this.book.buyLink);
  }
}
