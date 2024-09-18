import { PaymentType } from '../models/payment-type.enum';
import { SelectableOption } from '../models/selectable-option.model';

export const PAYMENT_TYPES: SelectableOption[] = [
  {
    value: PaymentType.CASH,
    label: 'Gotówka',
  },
  {
    value: PaymentType.CARD,
    label: 'Karta',
  },
  {
    value: PaymentType.BLIK,
    label: 'BLik',
  },
];
