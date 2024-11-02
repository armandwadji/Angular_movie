import {Component, effect} from "@angular/core";
import {Movie} from "../Movie";
import {MovieService} from "../movie.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styles: [],
})
export class FavoritesComponent {
  favoritesMovies: Movie[] = [];

  constructor(private readonly movieService: MovieService) {
    effect( _ =>  this.favoritesMovies = this.movieService.favoritesMovies() );
  }
}
