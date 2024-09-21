import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'dynamicForm',
  standalone: true
})
export class DynamicFormPipe implements PipeTransform {
  transform(group: FormGroup<any>, controlName: string) {
    return group.get(controlName) as FormControl<any>;
  }

}
