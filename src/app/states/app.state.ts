import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  GetRequestParamsForRestaurants,
  GetRestaurants,
  UpdateRequestParamsForRestaurants,
  UpdateRestaurants,
} from '../actions/app.action';
import {
  GetRestaurantsParams,
  PaginationMeta,
  RestaurantDTO,
} from '../services/restaurant.service';

export class AppStateModel {
  requestParamsForRestaurants!: GetRestaurantsParams;
  restaurants: RestaurantDTO[] = [];
  paginationMeta!: PaginationMeta;
}

@State<AppStateModel>({
  name: 'APP_STATE',
  defaults: {
    requestParamsForRestaurants: {
      page: 1,
      take: 10,
      status: '',
    },
    restaurants: [],
    paginationMeta: {
      hasNextPage: false,
      hasPreviousPage: false,
      itemCount: 0,
      page: 0,
      pageCount: 0,
      take: 0,
    },
  },
})
@Injectable()
export class AppState {
  @Selector()
  static getRequestParamsForRestaurantsSelector(state: AppStateModel) {
    return state.requestParamsForRestaurants;
  }
  @Selector()
  static getRestaurantsSelector(state: AppStateModel) {
    return {
      restaurants: state.restaurants,
      paginationMeta: state.paginationMeta,
    };
  }

  @Action(GetRequestParamsForRestaurants)
  getRequestParamsForRestaurants(ctx: StateContext<AppStateModel>) {
    return ctx.getState().requestParamsForRestaurants;
  }

  @Action(GetRestaurants)
  getRestaurants(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    return AppState.getRestaurantsSelector(state);
  }

  @Action(UpdateRequestParamsForRestaurants)
  updateRequestParamsForRestaurants(
    ctx: StateContext<AppStateModel>,
    payload: UpdateRequestParamsForRestaurants
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      requestParamsForRestaurants: {
        ...state.requestParamsForRestaurants,
        ...payload.data,
      },
    });
  }

  @Action(UpdateRestaurants)
  updateRestaurants(
    ctx: StateContext<AppStateModel>,
    payload: UpdateRestaurants
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      restaurants: payload.restaurants,
      paginationMeta: payload.paginationMeta,
    });
  }
}
