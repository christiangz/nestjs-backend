import { IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';

export class RestaurantsDto {
  @IsNotEmpty()
  @IsLatitude()
  readonly lat: string;

  @IsNotEmpty()
  @IsLongitude()
  readonly lon: string;
}