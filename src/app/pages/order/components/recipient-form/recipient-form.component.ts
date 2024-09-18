import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-recipient-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputMaskModule, InputTextModule],
  templateUrl: './recipient-form.component.html',
  styleUrl: './recipient-form.component.scss',
})
export class RecipientFormComponent {
  recipientForm = input.required<any>();
}
