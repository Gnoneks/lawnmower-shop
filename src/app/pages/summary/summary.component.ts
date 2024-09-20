import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { LawnmowerDetailsComponent } from '../../shared/components/lawnmower-details/lawnmower-details.component';
import { Router } from '@angular/router';
import { UserDataComponent } from './user-data/user-data/user-data.component';
import { Lawnmower } from '../../shared/models/lawnmower.model';
import { OrderDetails } from '../../shared/models/purchase-data.model';
import { Order } from '../../shared/models/order-details.model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [AsyncPipe, LawnmowerDetailsComponent, UserDataComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  readonly orderData$: Observable<Order>;

  constructor(
    private readonly _router: Router,
    private readonly _store: Store<{ orderData: Order }>
  ) {
    this.orderData$ = _store.select('orderData');
  }

  ngOnInit() {
    this.orderData$.subscribe((v) => {
      //TODO
      console.log('v.order', v.orderDetails);
      if (!v.lawnmower && !v.orderDetails) {
        this._router.navigateByUrl('/');
      }
    });
  }
}
