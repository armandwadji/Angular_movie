import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { MovieService } from './movie.service';
import { RouterModule, Routes } from '@angular/router';
import { MovieGenrePipe } from './movie-genre.pipe';
import { FormMovieComponent } from './form-movie/form-movie.component';
import { CardMovieComponent } from './card-movie/card-movie.component';
import { FavoriesComponent } from './favories/favories.component';

const movieRoutes: Routes = [
  { path: 'movies', component: ListMovieComponent },
  { path: 'favories', component: FavoriesComponent }
]

@NgModule({
  declarations: [ListMovieComponent, MovieGenrePipe, FormMovieComponent, CardMovieComponent, FavoriesComponent],
  imports: [CommonModule, RouterModule.forChild(movieRoutes)],
  providers: [MovieService],
})
export class MovieModule { }
