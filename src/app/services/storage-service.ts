import { Injectable } from '@angular/core';
import {Movie} from "../movie/Movie";
import {LocalStorageEnum} from "../enums/LocalStorageEnum";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _movies : Movie[];

  get movies(): Movie[]{
    this._movies = JSON.parse(localStorage.getItem(LocalStorageEnum.MOVIES) as string) || []
    return this._movies;
  }


  set movies(movie: Movie) {
    const moviesStorage: Movie[] = this.movies;
    if (!moviesStorage.find((currentMovie: Movie) => currentMovie.id === movie.id)) {
      localStorage.setItem(LocalStorageEnum.MOVIES, JSON.stringify([...moviesStorage, movie]));
    } else {
      localStorage.setItem(LocalStorageEnum.MOVIES, JSON.stringify(moviesStorage?.filter(currentMovie => currentMovie.id !== movie.id)));
    }
  }
}
