import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  removeList: boolean
  
  @Output()
  getFavoriteMovies= new EventEmitter<HTMLElement>()
  
  constructor(
    private readonly movieService: MovieService
  ){}
  
  toggleHeart() {
    this.movieService.movieStorage = this.movie;
  }

}
