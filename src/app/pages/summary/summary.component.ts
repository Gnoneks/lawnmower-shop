import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { LawnmowerDetailsComponent } from '../../shared/components/lawnmower-details/lawnmower-details.component';
import { Router } from '@angular/router';
import { UserDataComponent } from './user-data/user-data/user-data.component';
import { Lawnmower } from '../../shared/models/lawnmower.model';
import { PurchaseData } from '../../shared/models/purchase-data.model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [AsyncPipe, LawnmowerDetailsComponent, UserDataComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  readonly orderData$: Observable<{lawnmower: Lawnmower, order: PurchaseData}>;

  constructor(
    private readonly _router: Router,
    private readonly _store: Store<{ orderData: any }>
  ) {
    this.orderData$ = _store.select('orderData');
  }

  ngOnInit() {
    this.orderData$.subscribe((v) => {
      //TODO
      console.log('v.order', v.order);
      if (!v.lawnmower && !v.order) {
        this._router.navigateByUrl('/');
      }
    });
  }
}
