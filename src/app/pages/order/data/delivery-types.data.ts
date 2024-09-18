import { DeliveryType } from '../models/delivery-type.enum';
import { SelectableOption } from '../models/selectable-option.model';


export const DELIVERY_TYPES: SelectableOption[] = [
  {
    value: DeliveryType.COURIER,
    label: 'Kurier',
  },
  {
    value: DeliveryType.PERSONAL_PICKUP,
    label: 'Odbiór osobisty',
  },
  {
    value: DeliveryType.SERVICE_POINT_PICKUP,
    label: 'BLik',
  },
];
