import { DeliveryType } from '../../pages/order/models/delivery-type.enum';
import { PaymentType } from '../../pages/order/models/payment-type.enum';

export interface OrderDetails {
  paymentType: PaymentType;
  deliveryType: DeliveryType;
  deliveryDate: Date;
  deliveryAddress: RecipientData;
  userAddresses: RecipientData[];
}

export interface RecipientData {
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  zipCode: string;
  id?: number;
}
