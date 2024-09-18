import { FormControl } from '@angular/forms';
import { PaymentType } from './payment-type.enum';
import { DeliveryType } from './delivery-type.enum';

export interface OrderForm {
  paymentType: FormControl<PaymentType | null>;
  deliveryType: FormControl<DeliveryType | null>;
}
