import { Injectable } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ConfigurationForm } from './configuration-form.model';

@Injectable()
export class ConfigurationFormService {

  constructor(private readonly _fb: NonNullableFormBuilder) { }

  initForm(): FormGroup<ConfigurationForm> {
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

}
