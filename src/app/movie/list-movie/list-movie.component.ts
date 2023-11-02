import { Component, Signal } from "@angular/core";
import { Movie } from "../Movie";
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { MovieService } from "../movie.service";
import { ApiResponseDto } from '../../DTO/api-response.dto';

@Component({
  selector: "list-movie",
  templateUrl: "./list-movie.component.html",
  styles: [],
})
export class ListMovieComponent {
  constructor(private readonly movieService: MovieService) {}

  // @Input()
  // movieList$: Observable<Movie[]>;

  page: number = 1;
  totalPage: number = 1;
  search$$ = new BehaviorSubject<string>("marvel"); // BehaviorSubject permet de créer un observable auquel on peut souscrire tout en ayant une valeur initial
  sort$$ = new BehaviorSubject<string | null>(null);
  page$$ = new BehaviorSubject<number>(1);


  movieList: Signal<Movie[] | undefined> = toSignal(
    
    this.page$$.pipe(
      distinctUntilChanged(),
      switchMap((page) =>
        this.sort$$.pipe(
          distinctUntilChanged(), //Je prend en considération le trie que lorsque l'utilsateur clique sur des tris différents
          switchMap((sort) =>
            this.search$$.pipe(
              debounceTime(300),
              distinctUntilChanged((prev, next) => {
                if (prev !== next) {
                  this.page = 1;
                  this.page$$.next(this.page)
                }
                return prev === next
              }),
              switchMap((search: string) => this.movieService.searchMovie(search || "marvel", page)),
              map(({page, results: movieList, total_pages, total_results}: ApiResponseDto) => {
                
                this.totalPage = total_pages;
                return movieList.sort((a:any, b:any) => { if (sort === "goodToBad") return b.moyenne - a.moyenne; else return a.moyenne - b.moyenne; })
              })
            )
          )
        )
      )
    )
  );

  onVisible() {
    this.page++;
    this.page$$.next(this.page);
  }

  nextpage() {
    this.page++;
    this.page$$.next(this.page);
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
    }
    this.page$$.next(this.page);
  }
}
