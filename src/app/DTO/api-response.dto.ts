import { Movie } from "../movie/Movie";

export interface ApiResponseDto {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }