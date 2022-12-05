import { Component, OnInit } from '@angular/core';
import { Book, BookCategory } from 'src/app/models';
import { BookService } from '../book.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  // books = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  bookCategories: BookCategory[] = [
    {
      title: '',
      categoryId: '',
    },
  ];

  // books: Book[] = [
  //   {
  //     title: 'Harry Potter 1',
  //     description: `The Shiba Inu is the smallest of the six original and distinct spitz
  //     breeds of dog from Japan. A small, agile dog that copes very well with
  //     mountainous terrain, the Shiba Inu was originally bred for hunting.`,
  //     author: 'J.K. Rowling 1',
  //     price: 100,
  //     buyLink:
  //       'https://www.amazon.in/Starts-Us-Colleen-Hoover/dp/1398518174/ref=zg_bs_books_sccl_1/258-3102793-1771154?psc=1',
  //     imageUrl: 'https://m.media-amazon.com/images/I/51StPSSsneL.jpg',
  //   },
  //   {
  //     title: 'Harry Potter 2',
  //     description: `The Shiba Inu is the smallest of the six original and distinct spitz
  //     breeds of dog from Japan. A small, agile dog that copes very well with
  //     mountainous terrain, the Shiba Inu was originally bred for hunting.`,
  //     author: 'J.K. Rowling 2',
  //     price: 100,
  //     buyLink:
  //       'https://www.amazon.in/Starts-Us-Colleen-Hoover/dp/1398518174/ref=zg_bs_books_sccl_1/258-3102793-1771154?psc=1',
  //     imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //   },
  //   {
  //     title: 'Harry Potter 3',
  //     description: `The Shiba Inu is the smallest of the six original and distinct spitz
  //     breeds of dog from Japan. A small, agile dog that copes very well with
  //     mountainous terrain, the Shiba Inu was originally bred for hunting.`,
  //     author: 'J.K. Rowling 3',
  //     price: 100,
  //     buyLink:
  //       'https://www.amazon.in/Starts-Us-Colleen-Hoover/dp/1398518174/ref=zg_bs_books_sccl_1/258-3102793-1771154?psc=1',
  //     imageUrl:
  //       'https://m.media-amazon.com/images/I/51yzj3H34aL._SX324_BO1,204,203,200_.jpg',
  //   },
  //   {
  //     title: 'Harry Potter 3',
  //     description: `The Shiba Inu is the smallest of the six original and distinct spitz
  //     breeds of dog from Japan. A small, agile dog that copes very well with
  //     mountainous terrain, the Shiba Inu was originally bred for hunting.`,
  //     author: 'J.K. Rowling 3',
  //     price: 100,
  //     buyLink:
  //       'https://www.amazon.in/Starts-Us-Colleen-Hoover/dp/1398518174/ref=zg_bs_books_sccl_1/258-3102793-1771154?psc=1',
  //     imageUrl:
  //       'https://m.media-amazon.com/images/I/51yzj3H34aL._SX324_BO1,204,203,200_.jpg',
  //   },
  //   {
  //     title: 'Harry Potter 3',
  //     description: `The Shiba Inu is the smallest of the six original and distinct spitz
  //     breeds of dog from Japan. A small, agile dog that copes very well with
  //     mountainous terrain, the Shiba Inu was originally bred for hunting.`,
  //     author: 'J.K. Rowling 3',
  //     price: 100,
  //     buyLink:
  //       'https://www.amazon.in/Starts-Us-Colleen-Hoover/dp/1398518174/ref=zg_bs_books_sccl_1/258-3102793-1771154?psc=1',
  //     imageUrl:
  //       'https://m.media-amazon.com/images/I/51yzj3H34aL._SX324_BO1,204,203,200_.jpg',
  //   },
  //   {
  //     title: 'Harry Potter 3',
  //     description: `The Shiba Inu is the smallest of the six original and distinct spitz
  //     breeds of dog from Japan. A small, agile dog that copes very well with
  //     mountainous terrain, the Shiba Inu was originally bred for hunting.`,
  //     author: 'J.K. Rowling 3',
  //     price: 100,
  //     buyLink:
  //       'https://www.amazon.in/Starts-Us-Colleen-Hoover/dp/1398518174/ref=zg_bs_books_sccl_1/258-3102793-1771154?psc=1',
  //     imageUrl:
  //       'https://m.media-amazon.com/images/I/51yzj3H34aL._SX324_BO1,204,203,200_.jpg',
  //   },
  // ];

  books: Book[] = [];

  selectedBookCategory: any;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchBookCategories();
  }

  fetchBookCategories() {
    this.bookService
      .getBookCategories()
      .pipe(
        map((response) => {
          return this.getTranformedCategories(response);
        })
      )
      .subscribe({
        next: (categories: BookCategory[]) => {
          this.bookCategories = categories;
          this.onCategorySelected(this.bookCategories[0]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getTranformedCategories(categoryResponse: any): BookCategory[] {
    /* categoryResponse
        {
          "status": "OK",
          "copyright": "Copyright (c) 2019 The New York Times Company.  All Rights Reserved.",
          "num_results": 53,
          "results": [
            {
              "list_name": "Combined Print and E-Book Fiction",
              "display_name": "Combined Print & E-Book Fiction",
              "list_name_encoded": "combined-print-and-e-book-fiction",
              "oldest_published_date": "2011-02-13",
              "newest_published_date": "2016-03-20",
              "updated": "WEEKLY"
            },
            {
              "list_name": "Science Fiction",
              "display_name": "Science Fiction",
              "list_name_encoded": "science-fiction",
              "oldest_published_date": "2011-02-13",
              "newest_published_date": "2016-03-20",
              "updated": "WEEKLY"
            }
          ]
        }
    */

    /*
        BookCategory[]
        [
          {
            title: "Combined Print and E-Book Fiction",
            categoryId: "combined-print-and-e-book-fiction"
          },
          {
            title: 'Science Fiction',
            categoryId: 'science-fiction'
          }
        ]

    */

    const tranformedCategories = categoryResponse.results.map(
      (category: any) => {
        const newCategory: BookCategory = {
          title: category.list_name,
          categoryId: category.list_name_encoded,
        };
        return newCategory;
      }
    );
    return tranformedCategories;
  }

  onCategorySelected(category: BookCategory) {
    this.selectedBookCategory = category;
    this.fetchBooksByCategory();
  }

  fetchBooksByCategory() {
    this.bookService
      .getBooksByCategory(this.selectedBookCategory.categoryId)
      .pipe(
        map((response): Book[] => {
          return this.getTransformedBooks(response);
        })
      )
      .subscribe({
        next: (books: Book[]) => {
          this.books = books;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getTransformedBooks(booksResponse: any): Book[] {
    return booksResponse.results.books.map((book: any) => {
      const newBook: Book = {
        title: book.title,
        description: book.description,
        author: book.author,
        price: Number(book.price),
        buyLink: book.amazon_product_url,
        imageUrl: book.book_image,
      };
      return newBook;
    });
  }

  goToBookDetailView(book: Book) {
    localStorage.setItem('selectedBook', JSON.stringify(book));
    this.router.navigate(['../detail'], {
      relativeTo: this.activatedRoute,
    });
  }
}
