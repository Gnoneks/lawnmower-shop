import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { LawnmowerDetailsComponent } from '../../shared/components/lawnmower-details/lawnmower-details.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [AsyncPipe, LawnmowerDetailsComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  readonly orderData$: Observable<any>;

  constructor(private readonly _store: Store<{ orderData: any }>) {
    this.orderData$ = _store.select('orderData');
  }
}
