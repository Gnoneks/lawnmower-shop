import { createReducer, on } from '@ngrx/store';
import { Lawnmower } from '../shared/models/lawnmower.model';
import { storeLawnmower, storeOrderDetails } from './order.actions';
import { OrderDetails } from '../shared/models/purchase-data.model';

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
    console.log('lawnmower', lawnmower);

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
