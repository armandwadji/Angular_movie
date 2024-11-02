import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'header',
  template: `
    <nav>
      <ul>
        <a routerLink="movies" routerLinkActive="active" (click)="goToHome()">
          <li>Acceuil</li>
        </a>
        <a routerLink="favorites" routerLinkActive="active" (click)="goToFavorites()">
          <li>Coup de coeur</li>
        </a>
      </ul>
    </nav>
    <h1>Shaki Movies</h1>
  `,
  styles: [
  ]
})
export class HeaderComponent {

  constructor(
    private readonly router: Router
  ){}

  goToHome() {
    this.router.navigate(["movies"]);
  }

  goToFavorites() {
    this.router.navigate(["favorites"]);
  }

}
