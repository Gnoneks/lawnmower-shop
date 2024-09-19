import { createReducer, on } from '@ngrx/store';
import { Lawnmower } from '../shared/models/lawnmower.model';
import { storeLawnmower, storeOrderDetails } from './order.actions';

export const initialState: {
  lawnmower: Lawnmower | null;
  orderData: any | null;
} = {
  lawnmower: null,
  orderData: null,
};

export const orderReducer = createReducer(
  initialState,
  on(storeLawnmower, (state, { lawnmower }) => ({
    ...state,
    lawnmower,
  })),
  on(storeOrderDetails, (state, { orderData }) => ({
    ...state,
    orderData,
  }))
);
