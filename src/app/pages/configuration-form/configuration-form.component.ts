import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Engine } from '../../shared/models/engine.enum';
import { LAWNMOWNERS } from '../../lawnmowers.data';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';

interface ConfigurationForm {
  engine: FormControl<Engine | null>;
  brand: FormControl<string | null>;
  model: FormControl<string | null>;
}

@Component({
  selector: 'app-configuration-form',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule],
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
})
export class ConfigurationFormComponent implements OnInit, OnDestroy {
  brands: string[] = [];
  models: string[] = [];

  readonly lawnmowers = LAWNMOWNERS;
  readonly configurationForm = this._initForm();
  readonly engineTypes = Object.values(Engine);

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _fb: NonNullableFormBuilder) {}

  ngOnInit() {
    this._listenToEngineChange();
  }

  private _listenToEngineChange() {
    const { engine, brand, model } = this.configurationForm.controls;

    engine.valueChanges
      .pipe(
        tap(() => {
          brand.disabled && brand.enable();
          brand.setValue('', { emitEvent: false });

          model.enabled && model.disable();
          model.setValue('', { emitEvent: false });
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((selectedEngine) => {
        if (selectedEngine) {
          const filteredLawnmowers = this.lawnmowers.filter(
            ({ engine }) => engine === selectedEngine
          );

          this.brands = [...new Set(filteredLawnmowers.map((lm) => lm.brand))];
        }
      });

    brand.valueChanges
      .pipe(
        tap(() => {
          model.disabled && model.enable();
          model.setValue('');
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((selectedBrand) => {
        console.log(selectedBrand);
        if (selectedBrand) {
          const filteredLawnmowers = this.lawnmowers.filter(
            ({ brand, engine }) =>
              brand === selectedBrand &&
              engine === this.configurationForm.value.engine
          );

          this.models = filteredLawnmowers.map((lm) => lm.model);
        }
      });
  }

  private _initForm(): FormGroup<ConfigurationForm> {
    const form = this._fb.group<ConfigurationForm>({
      engine: new FormControl(null, Validators.required),
      brand: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      model: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
    });

    return form;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
