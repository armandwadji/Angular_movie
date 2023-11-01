import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, map, of } from "rxjs";
import { Movie } from "./Movie";
import { MovieApiSerializer } from "./movie-api.serializer";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=0d35c2af84390857eb8ff45e611f310d&language=fr-FR";

  constructor(
    private readonly http: HttpClient,
    private readonly movieApiSerialiser: MovieApiSerializer
  ) {}

  private convertMovieList(response: any): Movie[] {
    return response.results.map((movie: any) =>
      this.movieApiSerialiser.fromJson(movie)
    );
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<object>(`${this.baseUrl}&query=marvel`).pipe(
      map((data: object) => this.convertMovieList(data)),
      catchError((error) => this.handleError(error, []))
    );
  }

  searchMovie(search: string, page: number): Observable<Movie[]> {
    const params = new HttpParams().append("query", search).append("page", page);

    return this.http.get<Object>(`${this.baseUrl}`, { params }).pipe(
      map((data: object) => this.convertMovieList(data)),
      catchError((error) => this.handleError(error, []))
    );
  }

  public get movieStorage(): Movie[] {
    const movies = localStorage.getItem("movies");
    return movies ? JSON.parse(movies) : [];
  }

  public set movieStorage(movie: Movie) {
    const moviesStorage: Movie[] = this.movieStorage;
     
    if (!moviesStorage.find((currentMovie: Movie) => currentMovie.id === movie.id)) {
      localStorage.setItem("movies", JSON.stringify([...moviesStorage, movie]));
    } else {
      localStorage.setItem("movies", JSON.stringify(moviesStorage.filter(currentMovie => currentMovie.id !== movie.id)));
      
    }
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
