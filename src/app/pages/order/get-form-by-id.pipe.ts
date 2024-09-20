import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TypedForm } from '../../shared/models/typed-form.model';
import { RecipientData } from '../../shared/models/purchase-data.model';

@Pipe({
  name: 'getFormById',
  standalone: true,
})
export class GetFormByIdPipe implements PipeTransform {
  transform(
    formArray: FormArray<FormGroup<TypedForm<RecipientData>>>,
    id: number
  ): FormGroup<TypedForm<RecipientData>> {
    return formArray.controls.find((control) => control.value.id === id)!;
  }
}
