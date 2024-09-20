import { Component, input } from '@angular/core';
import { Lawnmower } from '../models/lawnmower.model';
import { Engine } from '../models/engine.enum';

@Component({
  selector: 'app-lawnmower-details',
  standalone: true,
  imports: [],
  templateUrl: './lawnmower-details.component.html',
  styleUrl: './lawnmower-details.component.scss',
})
export class LawnmowerDetailsComponent {
  readonly lawnmower = input.required<Lawnmower>();
  readonly engineTypes = Engine;
}
