import { Component, OnDestroy, OnInit } from '@angular/core';
import { Engine } from '../../shared/models/engine.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationFormService } from './configuration-form.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { LawnmowerDetailsComponent } from '../../shared/lawnmower-details/lawnmower-details.component';
import { AsyncPipe } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-configuration-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    DropdownModule,
    LawnmowerDetailsComponent,
    FloatLabelModule
  ],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
})
export class ConfigurationFormComponent implements OnInit, OnDestroy {
  readonly configurationForm =
    this._configurationFormService.getConfigurationForm();
  readonly brands$ = this._configurationFormService.getBrands();
  readonly models$ = this._configurationFormService.getModels();
  readonly selectedLawnmower$ =
    this._configurationFormService.getSelectedLawnmower();

  readonly engineTypes = Engine;
  readonly engines = Object.values(Engine);

  private _subscription: Subscription;

  constructor(
    private readonly _configurationFormService: ConfigurationFormService,
    private readonly _router: Router,
    private readonly _messageService: MessageService
  ) {}

  ngOnInit() {
    this._subscription = this._configurationFormService.listenToFormChange();
  }

  proceedToOrder(event: MouseEvent) {
    event.preventDefault();

    if (this.configurationForm.valid) {
      this._configurationFormService.storeLawnmower();

      this._router.navigateByUrl('/order');
    } else {
      console.log('err');
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Proszę wybrać model kosiarki',
      });
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
