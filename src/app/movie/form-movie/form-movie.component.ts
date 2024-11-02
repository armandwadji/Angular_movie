import { Component, EventEmitter, Output } from "@angular/core";
import {SORT} from "../../enums/sort-enum";


@Component({
  selector: "form-movie",
  templateUrl: "./form-movie.component.html",
  styles: [],
})
export class FormMovieComponent {

  protected readonly SORT = SORT;

  @Output()
  searchValue = new EventEmitter<string>()

  @Output()
  sort = new EventEmitter<SORT | null>()

}
