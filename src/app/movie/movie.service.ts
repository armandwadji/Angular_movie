import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, tap } from "rxjs";
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
      map((data: any) => this.convertMovieList(data)),
      catchError((error) => this.handleError(error, []))
    );
  }

  searchMovie(search: string): Observable<Movie[]> {
    
    return this.http.get<Object>(`${this.baseUrl}&query=${search}`).pipe(
      map((data: any) => this.convertMovieList(data)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
