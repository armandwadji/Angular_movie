import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListMovieComponent} from './list-movie/list-movie.component';
import {MovieService} from './movie.service';
import {RouterModule, Routes} from '@angular/router';
import {MovieGenrePipe} from './movie-genre.pipe';
import {FormMovieComponent} from './form-movie/form-movie.component';
import {CardMovieComponent} from './card-movie/card-movie.component';
import {FavoritesComponent} from './favories/favorites.component';
import {InfiniteScrollDirective} from './infinite-scroll.directive';
import {LoaderComponent} from './loader/loader.component';
import {StorageService} from "../services/storage-service";

const movieRoutes: Routes = [
  {
    path: 'movies',
    component: ListMovieComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  }
]

@NgModule({
  declarations: [ListMovieComponent, MovieGenrePipe, FormMovieComponent, CardMovieComponent, FavoritesComponent, InfiniteScrollDirective, LoaderComponent],
  imports: [CommonModule, RouterModule.forChild(movieRoutes)],
  providers: [MovieService, StorageService],
})
export class MovieModule { }
