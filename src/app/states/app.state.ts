import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  GetRequestParamsForRestaurants,
  UpdateRequestParamsForRestaurants,
} from '../actions/app.action';
import { GetRestaurantsParams } from '../services/restaurant.service';

export class AppStateModel {
  requestParamsForRestaurants!: GetRestaurantsParams;
}

@State<AppStateModel>({
  name: 'APP_STATE',
  defaults: {
    requestParamsForRestaurants: {
      page: 1,
      take: 10,
      status: '',
    },
  },
})
@Injectable()
export class AppState {
  @Selector()
  static selectStateData(state: AppStateModel) {
    return state.requestParamsForRestaurants;
  }

  @Action(GetRequestParamsForRestaurants)
  getRequestParamsForRestaurants(ctx: StateContext<AppStateModel>) {
    return ctx.getState().requestParamsForRestaurants;
  }

  @Action(UpdateRequestParamsForRestaurants)
  updateRequestParamsForRestaurants(
    ctx: StateContext<AppStateModel>,
    payload: UpdateRequestParamsForRestaurants
  ) {
    const state = ctx.getState();
    console.log(payload.params);
    ctx.setState({
      ...state,
      requestParamsForRestaurants: {
        ...state.requestParamsForRestaurants,
        ...payload.params,
      },
    });
  }
}
