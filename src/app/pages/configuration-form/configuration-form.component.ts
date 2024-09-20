import { Component, OnInit } from '@angular/core';
import { Engine } from '../../shared/models/engine.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationFormService } from './configuration-form.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { LawnmowerDetailsComponent } from '../../shared/components/lawnmower-details/lawnmower-details.component';
import { AsyncPipe } from '@angular/common';

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
  ],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
  providers: [ConfigurationFormService],
})
export class ConfigurationFormComponent implements OnInit {
  readonly configurationForm =
    this._configurationFormService.getConfigurationForm();
  readonly brands$ = this._configurationFormService.getBrands();
  readonly models$ = this._configurationFormService.getModels();
  readonly selectedModel$ = this._configurationFormService.getSelectedModel();

  readonly engineTypes = Engine;
  readonly engines = Object.values(Engine);

  constructor(
    private readonly _configurationFormService: ConfigurationFormService,
    private readonly _router: Router
  ) {}

  ngOnInit() {
    this._configurationFormService.listenToFormChange();
  }

  proceedToOrder(event: MouseEvent) {
    event.preventDefault();

    if (this.configurationForm.valid) {
      this._configurationFormService.storeLawnmower();

      this._router.navigateByUrl('/order');
    }
  }
}
