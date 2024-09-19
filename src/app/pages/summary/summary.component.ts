import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lawnmower } from '../../shared/models/lawnmower.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  private readonly lawnmower$: Observable<Lawnmower>;

  constructor(private readonly _store: Store<{ lawnmower: Lawnmower }>) {
    this.lawnmower$ = _store.select('lawnmower');
  }

  ngOnInit() {
    this.lawnmower$.subscribe((v) => console.log(v))
    // console.log(this._store.dispatch(getLawnmower()));
  }
}
