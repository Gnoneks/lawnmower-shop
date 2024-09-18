import { FormControl } from "@angular/forms";
import { Engine } from "../../shared/models/engine.enum";

export interface ConfigurationForm {
  engine: FormControl<Engine | null>;
  brand: FormControl<string | null>;
  model: FormControl<string | null>;
}
