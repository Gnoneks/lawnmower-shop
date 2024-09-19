import { createAction, props } from '@ngrx/store';

export const storeLawnmower = createAction(
  '[Lawnmower] Store Lawnmower',
  props<{ lawnmower: any }>()
);

export const storeOrderDetails = createAction(
  '[Order] Store Order Data',
  props<{ orderData: any }>()
);
