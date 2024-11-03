import {Component, computed, inject, signal, Signal, WritableSignal} from "@angular/core";
import {Movie} from "../Movie";
import {debounceTime, distinctUntilChanged, map, Observable, switchMap} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {MovieService} from "../movie.service";
import {ApiResponseDto} from '../../DTO/api-response.dto';
import {SORT} from "../../enums/sort-enum";

@Component({
  selector: "list-movie",
  templateUrl: "./list-movie.component.html",
  styles: [],
})
export class ListMovieComponent {

    movieService = inject(MovieService)

    page: WritableSignal<number> = signal(1);
    search: WritableSignal<string | null> = signal(null);
    totalPage: WritableSignal<number> = signal(1);
    sort: WritableSignal<SORT | null> = signal(null);
    params: Signal<FilterParam> = computed(() => ({
        page: this.page(),
        sort: this.sort(),
        search: this.search(),
    }))

    movies$: Observable<Movie[]> = toObservable(this.params).pipe(
        debounceTime(300),
        distinctUntilChanged((previous: FilterParam, current: FilterParam)=>{
            if (previous.search!== current.search && current.page !== 1){
                this.page.set(1);
                return previous!== current
            }
            return previous === current;
        }),
        switchMap((param) => this.movieService.getMoviesByPageAndSearch(param.search || 'marvel', param.page)),
        map((apiResponse: ApiResponseDto) => {
            this.totalPage.set(apiResponse.total_pages)
            return apiResponse.results.sort((a: Movie, b: Movie) => this.sort() === SORT.GOOD_TO_BAD ? b.moyenne - a.moyenne : a.moyenne - b.moyenne)
        })
    )

    // @ts-ignore
    movieList: Signal<Movie[] > = toSignal(this.movies$);

    /*    this.page$$.pipe(
          distinctUntilChanged(),
          switchMap((page) =>
            this.sort$$.pipe(
              distinctUntilChanged(), //Je prend en considération le trie que lorsque l'utilsateur clique sur des tris différents
              switchMap((sort) =>
                this.search$$.pipe(
                  debounceTime(300),
                  distinctUntilChanged((prev, next) => {
                    if (prev !== next) {
                        this.page.set(1);
                        this.page$$.next(this.page())
                    }
                    return prev === next
                  }),
                  switchMap((search: string) => this.movieService.searchMovie(search || "marvel", page)),
                  map(({page, results: movieList, total_pages, total_results}: ApiResponseDto) => {
                      this.totalPage.set(total_pages);
                    return movieList.sort((a:any, b:any) => { if (sort === "goodToBad") return b.moyenne - a.moyenne; else return a.moyenne - b.moyenne; })
                  })
                )
              )
            )
          )
        )*/

  nextPage() {
      this.page.update((page: number) => this.page() + 1);
  }

  previousPage() {
      this.page.update((page: number) => page > 1 ? page - 1 : page);
  }
}

interface FilterParam {
    page: number,
    sort: SORT | null,
    search: string | null,
}


