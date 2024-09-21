import { Lawnmower } from './lawnmower.model';
import { OrderDetails } from './order-details.model';

export interface Order {
  lawnmower: Lawnmower;
  orderDetails: OrderDetails;
}
