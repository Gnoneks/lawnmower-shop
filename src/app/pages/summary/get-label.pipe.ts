import { Pipe, PipeTransform } from '@angular/core';
import { SelectableOption } from '../order/models/selectable-option.model';

@Pipe({
  name: 'getLabel',
  standalone: true
})
export class GetLabelPipe implements PipeTransform {

  transform(value: string, optionsArr: SelectableOption[]): unknown {
    const element = optionsArr.find((option)=> option.value === value);

    return element?.label || '';
  }

}
