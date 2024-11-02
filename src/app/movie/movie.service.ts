import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Movie} from "./Movie";
import {ApiResponseDto} from "../DTO/api-response.dto";
import {ResponseApiSerializer} from "./response-api.serializer";
import {environment} from "src/environments/environment";
import {StorageService} from "../services/storage-service";

@Injectable({
  providedIn: "root",
})
export class MovieService {

  baseUrl = environment.base_url;
  http : HttpClient = inject(HttpClient);
  responseApiSerializer: ResponseApiSerializer = inject(ResponseApiSerializer);
  storageService = inject(StorageService);
  favoritesMovies : WritableSignal<Movie[]> = signal(this.storageService.movies);

  /**
   * Méthode permettant de récupérer les films par recherche et pagination
   * @param search
   * @param page
   */
  public getMoviesByPageAndSearch(search: string, page: number): Observable<ApiResponseDto> {
    const params = new HttpParams().append("query", search).append("page", page || 1);

    return this.http.get<Object>(`${this.baseUrl}`, { params }).pipe(
      map((data: any) => this.convertMovieResponse(data)),
      catchError((error) => this.handleError(error, []))
    );
  }

  public updateFavoritesMovies(movie : Movie) {
    this.storageService.movies = movie;
    this.favoritesMovies.set(this.storageService.movies);
  }

  private convertMovieResponse(response: ApiResponseDto): ApiResponseDto {
    return  this.responseApiSerializer.fromJson(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
