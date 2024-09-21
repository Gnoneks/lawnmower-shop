import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeliveryType } from './models/delivery-type.enum';
import { PaymentType } from './models/payment-type.enum';
import {
  OrderDetails,
  RecipientData,
} from '../../shared/models/purchase-data.model';
import { TypedForm } from '../../shared/models/typed-form.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly _orderForm = this.initOrderForm();

  constructor(private readonly _fb: FormBuilder) {}

  getOrderForm() {
    return this._orderForm;
  }

  initOrderForm(): FormGroup<TypedForm<OrderDetails>> {
    return this._fb.group<TypedForm<OrderDetails>>({
      paymentType: [PaymentType.CARD, Validators.required],
      deliveryType: [DeliveryType.COURIER, Validators.required],
      deliveryDate: null,
      deliveryAddress: this._createRecipientForm(),
      recipients: this._fb.array([
        this._createRecipientForm(Math.floor(Math.random() * 10000)),
      ]),
    });
  }

  private _createRecipientForm(newId?: number) {
    const recipientForm = this._fb.group<TypedForm<RecipientData>>({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      apartmentNumber: [''],
      zipCode: ['', Validators.required],
    });

    if (newId)
      recipientForm.addControl(
        'id',
        new FormControl(newId, Validators.required)
      );

    return recipientForm;
  }

  addNewRecipient() {
    const newId = Math.floor(Math.random() * 10000);

    this._orderForm.controls.recipients.push(this._createRecipientForm(newId));
  }

  removeRecipient(id: number) {
    const recipients = this._orderForm.controls.recipients;
    const idx = recipients.value.findIndex(
      (value: RecipientData) => value.id === id
    );

    recipients.removeAt(idx);
  }
}
