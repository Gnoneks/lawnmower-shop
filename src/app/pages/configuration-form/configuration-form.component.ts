import { Component, OnDestroy, OnInit } from '@angular/core';
import { Engine } from '../../shared/models/engine.enum';
import { LAWNMOWNERS } from '../../lawnmowers.data';
import { ReactiveFormsModule } from '@angular/forms';
import { pairwise, startWith, Subject, takeUntil } from 'rxjs';
import { ConfigurationFormService } from './configuration-form.service';
import { Lawnmower } from '../../shared/models/lawnmower.model';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { storeLawnmower } from '../../store/order.actions';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-configuration-form',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
  providers: [ConfigurationFormService],
})
export class ConfigurationFormComponent implements OnInit, OnDestroy {
  brands: string[] = [];
  models: string[] = [];
  selectedModel?: Lawnmower;

  readonly lawnmowers = LAWNMOWNERS;
  readonly configurationForm = this._configurationFormService.initForm();
  readonly engineTypes = Engine;
  readonly engines = Object.values(Engine);

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _configurationFormService: ConfigurationFormService
  ) {}

  ngOnInit() {
    this._listenToEngineChange();
  }

  private _listenToEngineChange() {
    this.configurationForm.valueChanges
      .pipe(startWith(null), pairwise(), takeUntil(this._destroy$))
      .subscribe(([prev, next]) => {
        const { engine, brand, model } = this.configurationForm.controls;
        const selectedEngine = next?.engine;

        if (prev?.engine !== selectedEngine) {
          brand.disabled && brand.enable({ emitEvent: false });
          brand.reset();

          model.enabled && model.disable({ emitEvent: false });
          model.reset();

          const filteredLawnmowers = this.lawnmowers.filter(
            ({ engine }) => engine === selectedEngine
          );

          this.brands = [...new Set(filteredLawnmowers.map((lm) => lm.brand))];
        }

        if (prev?.brand !== next?.brand) {
          const selectedBrand = next?.brand;

          model.disabled && model.enable({ emitEvent: false });
          model.reset();

          const filteredLawnmowers = this.lawnmowers.filter(
            ({ brand, engine }) =>
              brand === selectedBrand && engine === selectedEngine
          );

          this.models = filteredLawnmowers.map((lm) => lm.model);
        }

        if (prev?.model !== next?.model) {
          this.selectedModel = this.lawnmowers.find(
            (lm) =>
              lm.engine === next?.engine &&
              lm.brand === next?.brand &&
              lm.model === next?.model
          );
        }
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
