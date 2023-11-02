import { Component, effect } from "@angular/core";
import { Movie } from "../Movie";
import { MovieService } from "../movie.service";

@Component({
  selector: "app-favories",
  templateUrl: "./favories.component.html",
  styles: [],
})
export class FavoriesComponent {
  favoriesMovies: Movie[];

  constructor(private readonly movieService: MovieService) {
    effect( _ =>  this.favoriesMovies = this.movieService.favoriesMovies() );
  }
}
