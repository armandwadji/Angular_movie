import {Component, effect, inject} from "@angular/core";
import {Movie} from "../Movie";
import {MovieService} from "../movie.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styles: [],
})
export class FavoritesComponent {
  favoritesMovies: Movie[] = [];
  movieService: MovieService = inject(MovieService);

  constructor() {
    effect( _ =>  this.favoritesMovies = this.movieService.favoritesMovies() );
  }
}
