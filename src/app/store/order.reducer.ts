import { createReducer, on } from '@ngrx/store';
import { Lawnmower } from '../shared/models/lawnmower.model';
import { storeLawnmower, storeOrderDetails } from './order.actions';
import { OrderDetails } from '../shared/models/order-details.model';

export const initialState: {
  lawnmower: Lawnmower | null;
  orderDetails: OrderDetails | null;
} = {
  lawnmower: null,
  orderDetails: null,
};

export const orderReducer = createReducer(
  initialState,
  on(storeLawnmower, (state, { lawnmower }) => {
    return {
      ...state,
      lawnmower,
    };
  }),
  on(storeOrderDetails, (state, { orderDetails }) => ({
    ...state,
    orderDetails,
  }))
);
