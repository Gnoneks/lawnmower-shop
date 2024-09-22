import { Component, input } from '@angular/core';
import { DataTileComponent } from '../data-tile/data-tile.component';
import { LAWNMOWER_DETAILS_FIELDS } from './lawnmower-details-fields.data';
import { Lawnmower } from '../../models/lawnmower.model';
import { Engine } from '../../models/engine.enum';

@Component({
  selector: 'app-lawnmower-details',
  standalone: true,
  imports: [DataTileComponent],
  templateUrl: './lawnmower-details.component.html',
  styleUrl: './lawnmower-details.component.scss',
})
export class LawnmowerDetailsComponent {
  readonly lawnmower = input.required<Lawnmower>();
  readonly engineTypes = Engine;
  readonly lawnmowerFields = LAWNMOWER_DETAILS_FIELDS;
}
