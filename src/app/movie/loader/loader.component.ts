import { Component } from "@angular/core";

@Component({
  selector: "loader",
  template: `
    <div class="loader">
      <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoaderComponent {}
