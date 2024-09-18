import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OrderForm } from './models/order-form.model';

@Injectable()
export class OrderService {
  constructor(private readonly _fb: FormBuilder) {}

  initOrderForm(): FormGroup<OrderForm> {
    //TODO ANY
    return this._fb.group<OrderForm>({
      paymentType: new FormControl(null, Validators.required),
      deliveryType: new FormControl(null, Validators.required),
      // deliveryDate: '',
      // deliveryAddress: this._fb.group({
      //   firstName: '',
      //   lastName: '',
      //   city: '',
      //   street: '',
      //   houseNumber: '',
      //   apartmentNumber: '',
      //   zipCode: '',
      // }),
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
