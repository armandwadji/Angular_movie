import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { MovieService } from './movie.service';
import { RouterModule, Routes } from '@angular/router';
import { MovieGenrePipe } from './movie-genre.pipe';

const movieRoutes: Routes = [
  { path: 'movies', component: ListMovieComponent }
]

@NgModule({
  declarations: [ListMovieComponent, MovieGenrePipe],
  imports: [CommonModule, RouterModule.forChild(movieRoutes)],
  providers: [MovieService],
})
export class MovieModule { }
