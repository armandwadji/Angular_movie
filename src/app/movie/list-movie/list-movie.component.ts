import { Component, Signal } from "@angular/core";
import { Movie } from "../Movie";
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, switchMap, filter, Subject, startWith } from 'rxjs';
import { toSignal } from "@angular/core/rxjs-interop";
import { MovieService } from "../movie.service";

@Component({
  selector: "list-movie",
  templateUrl: "./list-movie.component.html",
  styles: [],
})
export class ListMovieComponent {

  constructor(
    private readonly movieService : MovieService
  ) { }
  
  // @Input()
  // movieList$: Observable<Movie[]>;

  search$$ = new Subject<string>(); // BehaviorSubject permet de créer un observable auquel on peut souscrire tout en ayant une valeur initial
  sort$$ = new BehaviorSubject<string | null>("goodToBad")
  visible$$ = new Subject<HTMLElement>();

  movieList: Signal< Movie[] | undefined> = toSignal(
    this.sort$$.pipe(
      filter(Boolean),
      distinctUntilChanged(), //Je prend en considération le trie que lorsque l'utilsateur clique sur des tris différents
      switchMap(sort => this.search$$.pipe(
          startWith("marvel"),
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((search : string) => this.movieService.searchMovie(search || 'marvel')),
          map((movieList : Movie[]) => 
            movieList.sort((a, b) => {
              if (sort === "goodToBad") return b.moyenne - a.moyenne;
              else return a.moyenne - b.moyenne
            })
          )
        )
      )
    )
  );

  onVisible(font : any) {
    console.log(font);
  }
}
