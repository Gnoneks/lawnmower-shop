import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PaymentType } from './payment-type.enum';
import { DeliveryType } from './delivery-type.enum';

export interface OrderForm {
  paymentType: FormControl<PaymentType | null>;
  deliveryType: FormControl<DeliveryType | null>;
  deliveryDate: FormControl<Date | null>;
  deliveryAddress: FormGroup<RecipientForm>;
  userAddresses: FormArray<FormGroup<RecipientForm>>;
}

export interface RecipientForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  city: FormControl<string | null>;
  street: FormControl<string | null>;
  houseNumber: FormControl<string | null>;
  apartmentNumber: FormControl<string | null>;
  zipCode: FormControl<string | null>;
  id?: FormControl<number | null>;
}
