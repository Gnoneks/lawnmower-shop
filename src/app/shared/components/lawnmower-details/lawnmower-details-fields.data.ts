import { Engine } from "../../models/engine.enum";
import { Lawnmower } from "../../models/lawnmower.model";

export const LAWNMOWER_DETAILS_FIELDS: LawnmowerDetailsField[] = [
  {
    engine: Engine.ACCUMULATOR,
    value: 'accumulatorAmount',
    label: 'Ilość akumulatorów',
  },
  {
    engine: Engine.ACCUMULATOR,
    value: 'accumulatorCapacity',
    label: 'Pojemność akumulatora',
    unit: 'Ah',
  },
  {
    engine: Engine.ACCUMULATOR,
    value: 'color',
    label: 'Kolor',
  },

  {
    engine: Engine.COMBUSTION,
    value: 'engineDisplacement',
    label: 'Pojemność skokowa silnika',
  },
  {
    engine: Engine.COMBUSTION,
    value: 'tankCapacity',
    label: 'Pojemność baku',
    unit: 'L',
  },
  {
    engine: Engine.COMBUSTION,
    value: 'cuttingLevelsAmount',
    label: 'Ilość poziomów koszenia',
  },
  {
    engine: Engine.ELECTRIC,
    value: 'cableLength',
    label: 'Długość kabla:',
    unit: 'm',
  },
  {
    engine: Engine.ELECTRIC,
    value: 'bladesAmount',
    label: 'Ilość ostrzy:',
    unit: 'Ah',
  },
  {
    engine: Engine.ELECTRIC,
    value: 'color',
    label: 'Kolor',
  },
];

interface LawnmowerDetailsField {
  engine: Engine;
  value: keyof Lawnmower;
  label: string;
  unit?: string;
}
