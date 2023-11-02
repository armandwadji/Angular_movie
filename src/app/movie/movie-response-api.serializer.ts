import { Injectable } from "@angular/core";
import { BaseApiDtoSerializer } from "../DTO/base-dto-api.serializer";
import { ApiResponseDto } from "../DTO/api-response.dto";
import { MovieApiSerializer } from "./movie-api.serializer";

@Injectable({
    providedIn: "root",
})
  
export class MovieResponseApiSerializer extends BaseApiDtoSerializer<ApiResponseDto> { 

    constructor(
        private readonly movieApiSerialiser: MovieApiSerializer
    ) {
        super();
    }
    
    public override fromJson(object: any): ApiResponseDto {
        return {
            page: object.page,
            results: object.results.map((result: object) => this.movieApiSerialiser.fromJson(result)),
            total_pages: object.total_pages,
            total_results: object.total_results,
        } as ApiResponseDto;
      }

}