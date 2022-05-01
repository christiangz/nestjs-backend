import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsDto } from './dtos/restaurants.dtos';

@UseGuards(AuthGuard('jwt'))
@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  getRestaurants(@Req() req: Request, @Query() query: RestaurantsDto) {
    console.log(req);
    return this.restaurantsService.getRestaurants(query);
  }

  @Get('transactions')
  getTransactions(@Req() req: Request) {
    console.log(req);
    return this.restaurantsService.getTransactions();
  }
}
