import { Routes } from '@angular/router';
import { ConfigurationFormComponent } from './pages/configuration-form/configuration-form.component';
import { OrderComponent } from './pages/order/order.component';
import { SummaryComponent } from './pages/summary/summary.component';

export const routes: Routes = [
  {
    path: '',
    component: ConfigurationFormComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
  {
    path: '**',
    component: ConfigurationFormComponent,
  },
];
