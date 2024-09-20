import { Lawnmower } from './lawnmower.model';
import { OrderDetails } from './purchase-data.model';

export interface Order {
  lawnmower: Lawnmower;
  orderDetails: OrderDetails;
}

