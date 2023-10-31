import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-favories',
  templateUrl: './favories.component.html',
  styles: [
  ]
})
export class FavoriesComponent implements OnInit {
  movieList: Movie[]
  
  constructor(
    private readonly movieService : MovieService
  ) { }
  
  ngOnInit(): void {
    this.movieList = this.movieService.movieStorage;
  }

}
