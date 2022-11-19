import { CategoryListComponent } from './category-list.component';
import { ProductListComponent } from './product-list.component';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ProductListComponent, CategoryListComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
