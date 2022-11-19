import { ProductComponent } from './product.component';
import {
  combineLatestAll,
  forkJoin,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  template: `
    <ng-container *ngFor="let category of categories$ | async; let i = index">
      <div class="container">
        <h2>{{ category.name }}</h2>
        <div class="list-container">
          <ng-container
            *ngFor="let product of category.products; let j = index"
          >
            <app-product
              *ngIf="j < 4"
              [title]="product.title"
              [thumbnail]="product.thumbnail"
              [price]="product.price"
            ></app-product>
          </ng-container>
        </div>

        <span
          style="display: block; margin-top: 1em; color: blue"
          *ngIf="category.products.length > 4"
          >See More</span
        >

        <hr />
      </div>
    </ng-container>
  `,
  styles: [
    `
      .container {
        margin: 1em 0;
      }

      .list-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2em;
      }

      hr {
        margin: 2em 0;
      }
    `,
  ],
  imports: [CommonModule, HttpClientModule, ProductComponent],
  standalone: true,
})
export class CategoryListComponent implements OnInit {
  categories$: any = this.productService.getCategories().pipe(
    map((categories: any) => [
      categories,
      categories.map((category: any) =>
        this.productService.getProductsByCategory(category)
      ),
    ]),
    switchMap(([categories, observables]) =>
      forkJoin(observables).pipe(
        map((products: any) =>
          categories.map((category: any, index: number) => ({
            name: category,
            products: products[index],
          }))
        )
      )
    )
  );

  constructor(private productService: ProductService) {}

  async ngOnInit() {}
}
