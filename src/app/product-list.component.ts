import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  template: `
    <section>
      <ng-container *ngFor="let product of products$ | async">
        <app-product
          *ngIf="product.price > 500"
          [title]="product.title"
          [price]="product.price"
          [thumbnail]="product.thumbnail"
        ></app-product>
      </ng-container>
    </section>
  `,
  styles: [
    `
      section {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2em;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, ProductComponent, HttpClientModule],
})
export class ProductListComponent {
  products$ = this.productService.getProducts();

  constructor(private productService: ProductService) {}
}
