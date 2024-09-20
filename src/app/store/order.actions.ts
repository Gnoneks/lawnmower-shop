import { createAction, props } from '@ngrx/store';
import { Lawnmower } from '../shared/models/lawnmower.model';
import { OrderDetails } from '../shared/models/purchase-data.model';

export const storeLawnmower = createAction(
  '[Lawnmower] Store Lawnmower',
  props<{ lawnmower: Lawnmower }>()
);

export const storeOrderDetails = createAction(
  '[Order] Store Order Data',
  props<{ orderDetails: OrderDetails }>()
);
