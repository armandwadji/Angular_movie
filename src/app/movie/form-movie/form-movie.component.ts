import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "form-movie",
  templateUrl: "./form-movie.component.html",
  styles: [],
})
export class FormMovieComponent {
  
  @Output()
  searchvalue = new EventEmitter<string>()

  @Output()
  sort = new EventEmitter<string | null>()

}
