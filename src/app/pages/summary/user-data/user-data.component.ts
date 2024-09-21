import { Component, input } from '@angular/core';
import { RecipientData } from '../../../shared/models/purchase-data.model';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent {
  user = input.required<RecipientData>()
}
