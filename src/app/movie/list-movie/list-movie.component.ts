import { Component, Input } from '@angular/core';
import { Movie } from '../Movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-movie',
  templateUrl: './list-movie.component.html',
  styles: [
  ]
})
export class ListMovieComponent {

  @Input()
  movieList$ : Observable<Movie[]> 

}
