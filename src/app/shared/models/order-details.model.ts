import { Lawnmower } from './lawnmower.model';
import { PurchaseData } from './purchase-data.model';

export interface OrderDetails {
  lawnmower: Lawnmower;
  purchaseData: PurchaseData;
}

