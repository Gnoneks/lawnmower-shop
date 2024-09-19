import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { PAYMENT_TYPES } from './data/payment-types.data';
import { DELIVERY_TYPES } from './data/delivery-types.data';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { RecipientFormComponent } from './components/recipient-form/recipient-form.component';
import { GetFormByIdPipe } from './get-form-by-id.pipe';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RadioButtonModule,
    CalendarModule,
    RecipientFormComponent,
    GetFormByIdPipe,
    ButtonModule,
    RouterLink,
    ToastModule,
    FloatLabelModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [OrderService, provideNativeDateAdapter(), MessageService],
})
export class OrderComponent implements OnInit {
  readonly orderForm = this._orderService.getOrderForm();
  readonly recipientsIds = [
    this.orderForm.controls.userAddresses.value[0].id || 0,
  ];
  readonly paymentTypes = PAYMENT_TYPES;
  readonly deliveryTypes = DELIVERY_TYPES;

  constructor(
    private readonly _orderService: OrderService,
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  addNewRecipient() {
    const newId = Math.floor(Math.random() * 10000);

    this.recipientsIds.push(newId);

    this._orderService.addNewRecipient(newId);
  }

  removeRecipient(id: number) {
    const idx = this.recipientsIds.findIndex(
      (recipientId) => recipientId === id
    );

    this.recipientsIds.splice(idx, 1);
    this._orderService.removeRecipient(id);
  }

  goToSummary(event: MouseEvent) {
    event.preventDefault();
    console.log(
      this.orderForm.controls.deliveryAddress.controls.firstName.errors
    );
    if (this.orderForm.valid) {
      this._router.navigateByUrl('/summary');
    } else {
      this.orderForm.markAllAsTouched();
      this.orderForm.updateValueAndValidity();

      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Formularz wypełniony niepoprawnie!',
      });

      this._cdRef.detectChanges();
    }

    //TODO Save data to global service
  }

  ngOnInit() {
    this.orderForm.valueChanges.subscribe((v) => console.log(v));
  }
}
