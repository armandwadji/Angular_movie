import { Component, Input } from '@angular/core';
import { Movie } from '../Movie';

@Component({
  selector: 'card-movie',
  templateUrl: './card-movie.component.html',
  styles: [
  ]
})
export class CardMovieComponent {
  @Input()
  movie:Movie
}
