import { Injectable } from "@angular/core";
import { Movie } from "./Movie";
import { BaseApiDtoSerializer } from "../DTO/base-dto-api.serializer";

@Injectable({
  providedIn: "root",
})
export class MovieApiSerializer extends BaseApiDtoSerializer<Movie> {
  constructor() {
    super();
  }
  // Convertit l'objet provenant du serveur en objet de type T
  public override fromJson(object: any): Movie {
    return {
      id: object.id,
      title: object.title,
      date: object.release_date,
      image: object.poster_path ? `https://image.tmdb.org/t/p/w500${object.poster_path}` : `../../assets/poster.jpg`,
      moyenne: object.vote_average,
      genres: object.genre_ids,
      description: object.overview,
    } as Movie;
  }
  // Convertit l'objet de type T en objet json correspondant à ce que le serveur attend
  public override toJson(movie: Movie): any {
    return {
      id: movie.id,
      title: movie.title, // Le fameux mapping
      release_date: movie.date,
      poster_path: movie.image,
    };
  }
}
