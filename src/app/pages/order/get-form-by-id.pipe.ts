import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { RecipientForm } from './models/order-form.model';

@Pipe({
  name: 'getFormById',
  standalone: true,
})
export class GetFormByIdPipe implements PipeTransform {
  transform(
    formArray: FormArray<FormGroup<RecipientForm>>,
    id: number
  ): FormGroup<RecipientForm> {
    return formArray.controls.find((control) => control.value.id === id)!;
  }
}
