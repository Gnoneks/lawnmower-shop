import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RecipientForm } from '../../models/order-form.model';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RECIPIENT_FORM } from './recipient-form.data';

@Component({
  selector: 'app-recipient-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputMaskModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './recipient-form.component.html',
  styleUrl: './recipient-form.component.scss',
})
export class RecipientFormComponent {
  recipientForm = input.required<FormGroup<RecipientForm>>();

  readonly recipientFormData = RECIPIENT_FORM;
}
