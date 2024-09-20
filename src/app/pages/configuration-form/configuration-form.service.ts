import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ConfigurationForm } from './configuration-form.model';
import { BehaviorSubject, pairwise, startWith, Subject, takeUntil } from 'rxjs';
import { LAWNMOWNERS } from '../../lawnmowers.data';
import { Lawnmower } from '../../shared/models/lawnmower.model';
import { Store } from '@ngrx/store';
import { storeLawnmower } from '../../store/order.actions';
import { TypedForm } from '../../shared/models/typed-form.model';
import { Engine } from '../../shared/models/engine.enum';

@Injectable()
export class ConfigurationFormService implements OnDestroy {
  private readonly _brands$ = new BehaviorSubject<string[]>([]);
  private readonly _models$ = new BehaviorSubject<string[]>([]);
  private readonly _selectedModel$ = new BehaviorSubject<Lawnmower | null>(
    null
  );

  private readonly _lawnmowers = LAWNMOWNERS;
  private readonly _configurationForm = this._initConfigurationForm();
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _store: Store<{ lawnmower: Lawnmower }>
  ) {}

  getBrands() {
    return this._brands$.asObservable();
  }

  getModels() {
    return this._models$.asObservable();
  }

  getSelectedModel() {
    return this._selectedModel$.asObservable();
  }

  getConfigurationForm() {
    return this._configurationForm;
  }

  private _initConfigurationForm(): FormGroup<TypedForm<ConfigurationForm>> {
    return this._fb.group<TypedForm<ConfigurationForm>>({
      engine: [null, Validators.required],
      brand: [{ value: '', disabled: true }, Validators.required],
      model: [{ value: '', disabled: true }, Validators.required],
    });
  }

  listenToFormChange() {
    this._configurationForm.valueChanges
      .pipe(
        startWith({ engine: null, brand: null, model: null }),
        pairwise(),
        takeUntil(this._destroy$)
      )
      .subscribe(([prev, next]) => {
        const { brand, model } = this._configurationForm.controls;
        const {
          engine: selectedEngine,
          brand: selectedBrand,
          model: selectedModel,
        } = next;

        if (prev.engine !== selectedEngine) {
          brand.disabled && brand.enable({ emitEvent: false });
          brand.reset();

          model.enabled && model.disable({ emitEvent: false });
          model.reset();

          this._updateBrands(selectedEngine);
        }

        if (prev.brand !== selectedBrand) {
          model.disabled && model.enable({ emitEvent: false });
          model.reset();

          this._updateModels(selectedEngine, selectedBrand);
        }

        if (prev.model !== selectedModel) {
          this._selectedModel$.next(
            this._lawnmowers.find(
              (lm) =>
                lm.engine === selectedEngine &&
                lm.brand === selectedBrand &&
                lm.model === selectedModel
            )!
          );
        }
      });
  }

  private _updateBrands(selectedEngine: Engine) {
    const lawnmowers = this._lawnmowers.filter(
      ({ engine }) => engine === selectedEngine
    );

    this._brands$.next([...new Set(lawnmowers.map(({ brand }) => brand))]);
  }

  private _updateModels(selectedEngine: Engine, selectedBrand: string) {
    const lawnmowers = this._lawnmowers.filter(
      ({ brand, engine }) =>
        brand === selectedBrand && engine === selectedEngine
    );

    this._models$.next(lawnmowers.map(({ model }) => model));
  }

  storeLawnmower() {
    const lawnmower = this._selectedModel$.getValue();

    if (lawnmower) {
      this._store.dispatch(storeLawnmower({ lawnmower }));
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
