import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { PAYMENT_TYPES } from './data/payment-types.data';
import { DELIVERY_TYPES } from './data/delivery-types.data';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { RecipientFormComponent } from './recipient-form/recipient-form.component';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Store } from '@ngrx/store';
import { storeOrderDetails } from '../../store/order.actions';
import { OrderDetails } from '../../shared/models/purchase-data.model';
import { Order } from '../../shared/models/order-details.model';
import { Observable, Subject, take } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RadioButtonModule,
    CalendarModule,
    RecipientFormComponent,
    ButtonModule,
    RouterLink,
    ToastModule,
    FloatLabelModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [provideNativeDateAdapter(), MessageService],
})
export class OrderComponent implements OnInit {
  readonly orderForm = this._orderService.getOrderForm();
  readonly paymentTypes = PAYMENT_TYPES;
  readonly deliveryTypes = DELIVERY_TYPES;

  private readonly _orderData$: Observable<Order>;

  constructor(
    private readonly _orderService: OrderService,
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _store: Store<{ orderData: Order }>
  ) {
    this._orderData$ = _store.select('orderData');
  }

  ngOnInit() {
    // this._orderData$
    //   .pipe(take(1))
    //   .subscribe(
    //     ({ lawnmower }) => !lawnmower && this._router.navigateByUrl('/')
    //   );
  }

  addNewRecipient() {
    this._orderService.addNewRecipient();
  }

  removeRecipient(id: number) {
    this._orderService.removeRecipient(id);
  }

  goToSummary(event: MouseEvent) {
    event.preventDefault();

    // if (this.orderForm.valid) {
      this._store.dispatch(
        storeOrderDetails({
          orderDetails: this.orderForm.value as OrderDetails,
        })
      );

      this._router.navigateByUrl('/summary');
    // } else {
    //   this.orderForm.markAllAsTouched();
    //   this.orderForm.updateValueAndValidity();

    //   this._messageService.add({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: 'Formularz wypełniony niepoprawnie!',
    //   });
    // }
  }
}
