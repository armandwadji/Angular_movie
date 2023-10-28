import { IBaseDto } from "../DTO/ibase.dto";

export class Movie implements IBaseDto {
  id: number;
  title: string;
  date: Date;
  image: string;
  moyenne: number;
  genres: number[];
  description: string;
} 
