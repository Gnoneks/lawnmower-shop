import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { LawnmowerDetailsComponent } from '../../shared/lawnmower-details/lawnmower-details.component';
import { Router, RouterLink } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { Order } from '../../shared/models/order.model';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DataTileComponent } from '../../shared/data-tile/data-tile.component';
import { PAYMENT_TYPES } from '../order/data/payment-types.data';
import { DELIVERY_TYPES } from '../order/data/delivery-types.data';
import { GetLabelPipe } from './get-label.pipe';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    LawnmowerDetailsComponent,
    UserDataComponent,
    ButtonModule,
    RouterLink,
    DataTileComponent,
    GetLabelPipe
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  readonly orderData$: Observable<Order>;
  readonly paymentTypes = PAYMENT_TYPES;
  readonly deliveryTypes = DELIVERY_TYPES;

  constructor(
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _store: Store<{ orderData: Order }>
  ) {
    this.orderData$ = _store.select('orderData');
  }

  ngOnInit() {
    this.orderData$
      .pipe(take(1))
      .subscribe(
        ({ orderDetails }) => !orderDetails && this._router.navigateByUrl('/')
      );
  }

  confirmOrder() {
    this._messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Zamówienie zostało wysłane!',
    });
  }
}
