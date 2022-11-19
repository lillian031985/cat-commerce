import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    const products = this.http
      .get('https://dummyjson.com/products')
      .pipe(map((res: any) => res.products));
    return products;
  }

  getCategories() {
    return this.http.get('https://dummyjson.com/products/categories');
  }

  getProductsByCategory(category: string) {
    return this.http
      .get(`https://dummyjson.com/products/category/${category}`)
      .pipe(map((res: any) => res.products));
  }
}
