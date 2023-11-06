import { Component, EventEmitter, OnInit, Output, computed, effect, signal } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
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
import { toSignal } from "@angular/core/rxjs-interop";

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
  
  @Output()
  movieList:any;

  search = this.fb.nonNullable.group({
    name: [""],
    sort: [''],
  });

 // *************** LES SIGNAUX ***************
  name = signal("marvel");
  trie = signal('');
  page = signal(1);
  message = computed(() => `recherche ${this.name()} page : ${this.page()} trie : ${this.trie()}`);
  test = computed(() => {
    const movieList: Observable<ApiResponseDto> = this.movieService.searchMovie(this.name(), this.page(), this.trie()).pipe(debounceTime(300))
    return movieList
      // .subscribe(({ results }: ApiResponseDto) => results.sort((a: Movie, b: Movie) => (this.trie() === "goodToBad") ? b.moyenne - a.moyenne : a.moyenne - b.moyenne))
    .pipe(
      debounceTime(300),
      map(({ results }: ApiResponseDto) => results.sort((a:Movie, b:Movie) =>  (this.trie() === "goodToBad") ? b.moyenne - a.moyenne : a.moyenne - b.moyenne ))
    )
  },)
   // *************** LES SIGNAUX ***************

  movieList$: Observable<any> = this.getMovies();
  sort$: Observable<any> = this.sortMovies();
  
  constructor(
    private readonly movieService: MovieService,
    private readonly fb: FormBuilder
  ) {
    effect(() => {
      console.log(this.test);
    })
   }
  
  private getMovies(): Observable<any>{
    const filter$ = combineLatest([
      this.search.controls.name.valueChanges.pipe(startWith('marvel')),
    ]).pipe(debounceTime(300));

    return filter$.pipe(
      // switchMap(([search]) => this.movieService.searchMovie(search, this.page())),
      // map(({ results }: ApiResponseDto) => this.movieList = results)
    )
  }
  

  private sortMovies() {
    const filter$ = combineLatest([
      this.search.controls.sort.valueChanges.pipe(debounceTime(300))
    ]);

    return filter$.pipe(
      switchMap(([sort]) => {
        console.log(this.movieList);
        return this.movieList.sort((a: any, b: any) => { if (sort === "goodToBad") return b.moyenne - a.moyenne; else return a.moyenne - b.moyenne; })
      })
    );
  }

  increment() {
    this.page.update(page => page + 1);
  }

  decrement() {
    this.page.update(page => page > 1 ? page - 1 : 1)
  }

  // setSort(sort:string) {
  //   const name = this.search.get('name')?.value || '';
  //   console.log(name);
  //   this.search.setValue({name, sort})
    
  // }
    
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
