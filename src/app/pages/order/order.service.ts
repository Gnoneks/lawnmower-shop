import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderForm, RecipientForm } from './models/order-form.model';
import { DeliveryType } from './models/delivery-type.enum';
import { PaymentType } from './models/payment-type.enum';

@Injectable()
export class OrderService {
  private readonly _orderForm = this.initOrderForm();

  constructor() {}

  getOrderForm() {
    return this._orderForm;
  }

  initOrderForm(): FormGroup<OrderForm> {
    return new FormGroup<OrderForm>({
      paymentType: new FormControl(PaymentType.CARD, Validators.required),
      deliveryType: new FormControl(DeliveryType.COURIER, Validators.required),
      deliveryDate: new FormControl(null, Validators.required),
      deliveryAddress: this._createRecipientForm(),
      userAddresses: new FormArray([this._createRecipientForm(Math.floor(Math.random() * 10000))]),
    });
  }

  private _createRecipientForm(newId?: number) {
    const recipientForm = new FormGroup<RecipientForm>({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      houseNumber: new FormControl('', Validators.required),
      apartmentNumber: new FormControl(''),
      zipCode: new FormControl('', Validators.required),
    });

    if (newId)
      recipientForm.addControl(
        'id',
        new FormControl(newId, Validators.required)
      );

    return recipientForm;
  }

  addNewRecipient(newId: number) {
    this._orderForm.controls.userAddresses.push(
      this._createRecipientForm(newId)
    );
  }

  removeRecipient(id: number) {
    const userAddresses = this._orderForm.controls.userAddresses;
    const idx = userAddresses.value.findIndex((value) => value.id === id);

    userAddresses.removeAt(idx);
  }
}
