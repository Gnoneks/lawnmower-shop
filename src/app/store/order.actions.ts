import { createAction, props } from '@ngrx/store';
import { Lawnmower } from '../shared/models/lawnmower.model';
import { OrderDetails } from '../shared/models/order-details.model';

export const storeLawnmower = createAction(
  '[Lawnmower] Store Lawnmower',
  props<{ lawnmower: Lawnmower }>()
);

export const storeOrderDetails = createAction(
  '[Order Details] Store Order Data',
  props<{ orderDetails: OrderDetails }>()
);
