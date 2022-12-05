import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  /**
   * Gets all book categories
   * @returns Observable<Object>
   */
  getBookCategories(): Observable<Object> {
    const GET_CATEGORIES_URL = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${environment.newYorkTimesApiKey}`;
    return this.http.get(GET_CATEGORIES_URL);
  }

  /**
   * Get bestselling books by category
   * @param categoryName category name for which you want the books
   * @param date date for which you want the books 'YYYY-MM-DD | current'
   * @returns Observable<Object>
   */
  getBooksByCategory(
    categoryName: string,
    date = 'current'
  ): Observable<Object> {
    const GET_BOOKS_BY_CATEGORY_URL = `https://api.nytimes.com/svc/books/v3/lists/${date}/${categoryName}.json?api-key=${environment.newYorkTimesApiKey}`;
    return this.http.get(GET_BOOKS_BY_CATEGORY_URL);
  }
}
