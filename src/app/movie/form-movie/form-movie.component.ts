import {Component, model, ModelSignal} from "@angular/core";
import {SORT} from "../../enums/sort-enum";


@Component({
  selector: "form-movie",
  templateUrl: "./form-movie.component.html",
  styles: [],
})
export class FormMovieComponent {
  protected readonly SORT = SORT;
  sort: ModelSignal<SORT | null | undefined> = model();
  search: ModelSignal<string | null | undefined> = model();
}
