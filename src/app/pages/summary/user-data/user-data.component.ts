import { Component, input } from '@angular/core';
import { RecipientData } from '../../../shared/models/purchase-data.model';

const USER_DATA_FIELDS: {
  label: string;
  value: keyof RecipientData;
  optional?: boolean;
}[] = [
  { label: 'Imię', value: 'firstName' },
  { label: 'Nazwisko', value: 'lastName' },
  { label: 'Miasto', value: 'city' },
  { label: 'Ulica', value: 'street' },
  { label: 'Numer Domu', value: 'houseNumber' },
  { label: 'Numer mieszkania', value: 'apartmentNumber', optional: true },
  { label: 'Kod pocztowy', value: 'zipCode' },
];

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent {
  user = input.required<RecipientData>();

  readonly userDataFields = USER_DATA_FIELDS;
}
