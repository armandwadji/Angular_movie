import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../Movie';

@Component({
  selector: 'list-movie',
  templateUrl: './list-movie.component.html',
  styles: [
  ]
})
export class ListMovieComponent implements OnInit {

  movieList: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() { 
    this.movieService.getMovies().subscribe(data => this.movieList = data);
  }
}
