import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from "rxjs";
import { Movie } from "../Movie";
import { MovieService } from "../movie.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ApiResponseDto } from "src/app/DTO/api-response.dto";

@Component({
  selector: "form-movie",
  templateUrl: "./form-movie.component.html",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styles: [],
})
export class FormMovieComponent {
  @Output()
  searchvalue = new EventEmitter<string>();

  @Output()
  sort = new EventEmitter<string | null>();

  search = this.fb.nonNullable.group({
    name: [""],
    sort:[''],
  });

  movieList$: Observable<any> = this.getMovies();
  
  constructor(
    private readonly movieService: MovieService,
    private readonly fb: FormBuilder
  ) { }
  
  private getMovies(): Observable<any>{
    const movieList$ = this.movieService.getMovies();
    const searchName$ = this.search.controls.name.valueChanges.pipe(startWith('marvel'));
    const sort$ = this.search.controls.sort.valueChanges;
    return combineLatest([searchName$, sort$]).pipe(
      map(([name, sort]) => {
        this.movieService.searchMovie(name);
        console.log({ name, sort});
        return name
      })
    )
  }

  setSort() {
    this.search.setValue({name:"", sort: ""})
  }
    
  // searchTerms = new BehaviorSubject<string>( "marvel");
  // ngOnInit(): void {

  //   this.movieList$ = this.searchTerms.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap(search => this.movieService.searchMovie(search))
  //   )

  // }

  // search(term: string) {
  //   this.searchTerms.next(term);
  // }
}
