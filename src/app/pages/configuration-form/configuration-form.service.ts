import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ConfigurationForm } from './configuration-form.model';
import {
  BehaviorSubject,
  filter,
  Observable,
  pairwise,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { LAWNMOWNERS } from '../../lawnmowers.data';
import { Lawnmower } from '../../shared/models/lawnmower.model';
import { Store } from '@ngrx/store';
import { storeLawnmower } from '../../store/order.actions';
import { TypedForm } from '../../shared/models/typed-form.model';
import { Engine } from '../../shared/models/engine.enum';
import { Order } from '../../shared/models/order.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationFormService {
  private readonly _brands$ = new BehaviorSubject<string[]>([]);
  private readonly _models$ = new BehaviorSubject<string[]>([]);
  private readonly _selectedLawnmower$ = new BehaviorSubject<Lawnmower | null>(
    null
  );

  private readonly _lawnmowers = LAWNMOWNERS;
  private readonly _configurationForm = this._initConfigurationForm();

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _store: Store<{ orderData: Order }>
  ) {}

  getBrands() {
    return this._brands$.asObservable();
  }

  getModels() {
    return this._models$.asObservable();
  }

  getSelectedLawnmower() {
    return this._selectedLawnmower$.asObservable();
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
    return this._configurationForm.valueChanges
      .pipe(startWith(this._configurationForm.value), pairwise())
      .subscribe(([prev, next]) => {
        const { brand, model } = this._configurationForm.controls;
        const {
          engine: selectedEngine,
          brand: selectedBrand,
          model: selectedModel,
        } = next;

        if (prev.engine !== selectedEngine) {
          brand.enable({ emitEvent: false });
          brand.reset();

          model.disable({ emitEvent: false });
          model.reset();

          this._updateBrands(selectedEngine);
        }

        if (prev.brand !== selectedBrand) {
          model.enable({ emitEvent: false });
          model.reset();

          this._updateModels(selectedEngine, selectedBrand);
        }

        if (prev.model !== selectedModel) {
          const selectedLawnmower = this._lawnmowers.find(
            ({ engine, brand, model }) =>
              engine === selectedEngine &&
              brand === selectedBrand &&
              model === selectedModel
          )!;

          this._selectedLawnmower$.next(selectedLawnmower);
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
    const lawnmower = this._selectedLawnmower$.getValue();

    if (lawnmower) {
      this._store.dispatch(storeLawnmower({ lawnmower }));
    }
  }
}
