import { Component, model } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatCheckboxModule, MatRadioModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [OrderService],
})
export class OrderComponent {
  orderForm = this._orderService.initOrderForm();

  constructor(private readonly _orderService: OrderService) {}
}
