import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { RestaurantsDto } from './dtos/restaurants.dtos';

@Injectable()
export class RestaurantsService {
  async getRestaurants(payload: RestaurantsDto) {
    const restaurants = await axios.get(
      'https://api.tomtom.com/search/2/nearbySearch/.json',
      {
        params: {
          lat: payload.lat,
          lon: payload.lon,
          // lat: '-12.046373',
          // lon: '-77.042755',
          radius: '5000',
          view: 'Unified',
          relatedPois: 'off',
          key: 'mi8pSXDSVHdpl4NT9KAwTxs2NoY5RyI0',
          categorySet: '7315',
        },
      });

    return restaurants.data;

    //save transaction
  }

  async getTransactions() {
    return {};
  }
}
