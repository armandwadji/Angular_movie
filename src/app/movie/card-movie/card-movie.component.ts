import {Component, inject, Input} from '@angular/core';
import {Movie} from '../Movie';
import {MovieService} from '../movie.service';
import {StorageService} from "../../services/storage-service";

@Component({
  selector: 'card-movie',
  templateUrl: './card-movie.component.html',
  styles: [
  ]
})
export class CardMovieComponent {
    movieService: MovieService = inject(MovieService);
    storageService: StorageService = inject(StorageService);

  @Input({required: true})
  movie: Movie

  @Input()
  removeList: boolean


    /**
     * Méthode perméttent de stocker le film dans le localStorage
     */
  getMovieStorage() {
        this.movieService.updateFavoritesMovies(this.movie);
    };

    /**
     * Affichage plus foncé du button si le film fait partis des favoris
     */
  favoriteMovieSelected(): boolean {
        return Boolean(this.storageService.movies.find((currentMovie: Movie) => currentMovie.id === this.movie.id));
    };

}
