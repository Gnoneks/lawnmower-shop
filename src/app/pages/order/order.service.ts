import { Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Injectable()
export class OrderService {
  constructor(private readonly _fb: FormBuilder) {}

  initOrderForm() {
    //TODO ANY
    return this._fb.group<any>({
      paymenType: '',
      deliveryType: '',
      deliveryDate: '',
      deliveryAddress: this._fb.group({
        firstName: '',
        lastName: '',
        city: '',
        street: '',
        houseNumber: '',
        apartmentNumber: '',
        zipCode: '',
      }),
      allowedUsersAddress: this._fb.array([
        this._fb.group({
          firstName: '',
          lastName: '',
          city: '',
          street: '',
          houseNumber: '',
          apartmentNumber: '',
          zipCode: '',
        }),
      ]),
    });
  }
}
