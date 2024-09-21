import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  OrderDetails,
  RecipientData,
} from '../../shared/models/order-details.model';
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
      paymentType: [null, Validators.required],
      deliveryType: [null, Validators.required],
      deliveryDate: null,
      deliveryAddress: this._createRecipientForm(),
      recipients: this._fb.array([
        this._createRecipientForm(Math.floor(Math.random() * 10000)),
      ]),
    });
  }

  private _createRecipientForm(id?: number) {
    const recipientForm = this._fb.group<TypedForm<RecipientData>>({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      apartmentNumber: [''],
      zipCode: ['', Validators.required],
    });

    if (id) {
      recipientForm.addControl('id', new FormControl(id, Validators.required));
    }

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
