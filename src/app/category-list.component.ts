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
    <ng-container
      *ngFor="
        let productsOfCategory of productsOfCategories$ | async;
        let i = index
      "
    >
      <div class="container">
        <h2>{{ categories[i] }}</h2>
        <div class="list-container">
          <ng-container
            *ngFor="let product of productsOfCategory; let j = index"
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
          *ngIf="productsOfCategory.length > 4"
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
  categories$ = this.productService.getCategories();
  //   productsByCategory$ =
  //     this.productService.getProductsByCategory('smartphones');

  categories: any = [];

  productsOfCategories$: any = this.categories$.pipe(
    tap((res) => console.log(1, res)),
    tap((categories) => (this.categories = categories)),

    map((categories: any) => {
      return categories.map((category: any) => {
        // console.log(2, this.productService.getProductsByCategory(category));
        return this.productService.getProductsByCategory(category);
      });
    }),
    tap((res) => console.log(3, res)),
    switchMap((observables) => forkJoin(observables)),
    tap((res) => console.log(4, res))
  );

  constructor(private productService: ProductService) {}

  async ngOnInit() {}
}
