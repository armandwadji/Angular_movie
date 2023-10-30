import { Component, Input } from '@angular/core';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'card-movie',
  templateUrl: './card-movie.component.html',
  styles: [
  ]
})
export class CardMovieComponent {
  @Input({required: true})
  movie: Movie

  @Input()
  removeList:boolean

  constructor(
    private readonly movieService: MovieService
  ){}
  
  toggleHeart() {
    this.movieService.setMovieStorage(this.movie);
  }
}
