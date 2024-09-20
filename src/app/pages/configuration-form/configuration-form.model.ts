import { Engine } from "../../shared/models/engine.enum";

export interface ConfigurationForm {
  engine: Engine;
  brand: string;
  model: string;
}
