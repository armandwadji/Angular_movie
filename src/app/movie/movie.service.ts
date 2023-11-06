import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, catchError, map, of } from "rxjs";
import { Movie } from "./Movie";
import { MovieApiSerializer } from "./movie-api.serializer";
import { ApiResponseDto } from "../DTO/api-response.dto";
import { MovieResponseApiSerializer } from "./movie-response-api.serializer";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  baseUrl =
    "https://api.themoviedb.org/3/search/movie?api_key=0d35c2af84390857eb8ff45e611f310d&language=fr-FR";
  favoriesMovies = signal<Movie[]>(this.movieStorage);

  constructor(
    private readonly http: HttpClient,
    private readonly movieApiSerialiser: MovieApiSerializer,
    private readonly movieResponseApiSerializer: MovieResponseApiSerializer
  ) {}

  private convertMovieList(response: ApiResponseDto): Movie[] {
    return response.results.map((movie: any) =>
      this.movieApiSerialiser.fromJson(movie)
    );
  }

  private convertMovieResponse(response: ApiResponseDto): ApiResponseDto {
    return this.movieResponseApiSerializer.fromJson(response);
  }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<object>(`${this.baseUrl}&query=marvel`).pipe(
      map((data: any) => this.convertMovieList(data)),
      catchError((error) => this.handleError(error, []))
    );
  }

  public searchMovie(
    search: string = "marvel",
    page: number = 1,
    sort:string = 'goodtoBad'
  ): Observable<ApiResponseDto> {
    const params = new HttpParams()
      .append("query", search)
      .append("page", page || 1);

    return this.http.get<Object>(`${this.baseUrl}`, { params }).pipe(
      map((data: any) => this.convertMovieResponse(data)),
      catchError((error) => this.handleError(error, []))
    );
  }

  public updateFavoriesMovies() {
    this.favoriesMovies.update((_) => this.movieStorage);
  }

  public get movieStorage(): Movie[] {
    const movies = localStorage.getItem("movies");
    return movies ? JSON.parse(movies) : [];
  }

  public set movieStorage(movie: Movie) {
    const moviesStorage: Movie[] = this.movieStorage;

    if (
      !moviesStorage.find((currentMovie: Movie) => currentMovie.id === movie.id)
    ) {
      localStorage.setItem("movies", JSON.stringify([...moviesStorage, movie]));
    } else {
      localStorage.setItem(
        "movies",
        JSON.stringify(
          moviesStorage.filter((currentMovie) => currentMovie.id !== movie.id)
        )
      );
    }
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
