import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  template: `
    <article>
      <div class="container">
        <header>{{ title }}</header>
        <main>
          <div
            class="img"
            [style.background-image]="'url(' + thumbnail + ')'"
          ></div>

          <span [style.color]="price < 300 ? 'red' : 'black'">{{ price }}</span>
        </main>
      </div>
    </article>
  `,
  styles: [
    `
      article {
        border: 1px solid black;
        border-radius: 1em;
        width: 100%;
        aspect-ratio: 0.8;
      }

      .container {
        margin: 2em;
      }

      .img {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 10em;
        height: 10em;
      }
    `,
  ],
  standalone: true,
})
export class ProductComponent {
  @Input() title!: string;
  @Input() price!: number;
  @Input() thumbnail!: string;
}
