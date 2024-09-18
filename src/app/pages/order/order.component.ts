import { Component } from '@angular/core';
import { OrderService } from './order.service';
import { PAYMENT_TYPES } from './data/payment-types.data';
import { DELIVERY_TYPES } from './data/delivery-types.data';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { RecipientFormComponent } from './components/recipient-form/recipient-form.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RadioButtonModule,
    CalendarModule,
    RecipientFormComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [OrderService, provideNativeDateAdapter()],
})
export class OrderComponent {
  readonly orderForm = this._orderService.initOrderForm();
  readonly paymentTypes = PAYMENT_TYPES;
  readonly deliveryTypes = DELIVERY_TYPES;

  constructor(private readonly _orderService: OrderService) {}
}
