import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderForm } from './models/order-form.model';
import { DeliveryType } from './models/delivery-type.enum';
import { PaymentType } from './models/payment-type.enum';

@Injectable()
export class OrderService {
  constructor() {}

  initOrderForm(): FormGroup<OrderForm> {
    //TODO ANY
    return new FormGroup<OrderForm>({
      paymentType: new FormControl(PaymentType.CARD, Validators.required),
      deliveryType: new FormControl(DeliveryType.COURIER, Validators.required),
      deliveryDate: new FormControl(null, Validators.required),
      deliveryAddress: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        houseNumber: new FormControl('', Validators.required),
        apartmentNumber: new FormControl(''),
        zipCode: new FormControl('', Validators.required),
      }),
      // allowedUsersAddress: this._fb.array([
      //   this._fb.group({
      //     firstName: '',
      //     lastName: '',
      //     city: '',
      //     street: '',
      //     houseNumber: '',
      //     apartmentNumber: '',
      //     zipCode: '',
      //   }),
      // ]),
    });
  }
}
