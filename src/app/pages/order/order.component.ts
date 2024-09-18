import { Component, model } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from './order.service';
import { PAYMENT_TYPES } from './data/payment-types.data';
import { DELIVERY_TYPES } from './data/delivery-types.data';
import { MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule, MatLabel, MatRadioModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [OrderService],
})
export class OrderComponent {
  readonly paymentTypes = PAYMENT_TYPES;
  readonly deliveryTypes = DELIVERY_TYPES;

  orderForm = this._orderService.initOrderForm();

  constructor(private readonly _orderService: OrderService) {}
}
