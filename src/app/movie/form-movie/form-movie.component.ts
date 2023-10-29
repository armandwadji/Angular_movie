import { Component, OnInit } from "@angular/core";
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { Movie } from "../Movie";
import { MovieService } from '../movie.service';

@Component({
  selector: "form-movie",
  templateUrl: "./form-movie.component.html",
  styles: [],
})
export class FormMovieComponent implements OnInit{
  searchTerms = new Subject<string>();
  movieList$: Observable<Movie[]>;

  constructor(
    private readonly movieService : MovieService
  ){}
  
  ngOnInit(): void {
    
    this.movieList$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(search => this.movieService.searchMovie(search))
    )
    
  }

  search(term: string) { 
    this.searchTerms.next(term);
  }
}
