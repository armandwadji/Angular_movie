import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieGenre'
})
export class MovieGenrePipe implements PipeTransform {

  transform(genreId: number): string | number{
    switch (genreId) {
      case 28:
        return `Action`;
      case 12:
        return`Aventure`;
      case 16:
        return`Animation`;
      case 35:
        return`Comédie`;
      case 80:
        return`Policier`;
      case 99:
        return`Documentaire`;
      case 18:
        return`Drame`;
      case 10751:
        return`Famille`;
      case 14:
        return`Fantasy`;
      case 36:
        return`Histoire`;
      case 27:
        return`Horreur`;
      case 10402:
        return`Musique`;
      case 9648:
        return`Mystère`;
      case 10749:
        return`Romance`;
      case 878:
        return`Science-fiction`;
      case 10770:
        return`Téléfilm`;
      case 53:
        return`Thriller`;
      case 10752:
        return`Guerre`;
      case 37:
        return`Western`;
      default:
        return genreId
    }
  }

}
