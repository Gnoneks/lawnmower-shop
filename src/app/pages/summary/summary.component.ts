import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { LawnmowerDetailsComponent } from '../../shared/lawnmower-details/lawnmower-details.component';
import { Router } from '@angular/router';
import { UserDataComponent } from './user-data/user-data/user-data.component';
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
    this.orderData$
      .pipe(take(1))
      .subscribe(({ orderDetails }) => !orderDetails) &&
      this._router.navigateByUrl('/');
  }
}
