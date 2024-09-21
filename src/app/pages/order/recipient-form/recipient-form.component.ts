import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RECIPIENT_FORM } from './recipient-form.data';
import { TypedForm } from '../../../shared/models/typed-form.model';
import { RecipientData } from '../../../shared/models/purchase-data.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-recipient-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputMaskModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule
  ],
  templateUrl: './recipient-form.component.html',
  styleUrl: './recipient-form.component.scss',
})
export class RecipientFormComponent {
  recipientForm = input.required<FormGroup<TypedForm<RecipientData>>>();
  showRemoveButton = input<boolean>(false);

  removeRecipientOutput = output<number>();

  readonly recipientFormData = RECIPIENT_FORM;

  removeRecipient(id: number) {
    this.removeRecipientOutput.emit(id)
  }
}
