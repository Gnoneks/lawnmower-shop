import { Engine } from './engine.enum';

export interface Lawnmower {
  engine: Engine;
  brand: string;
  model: string;
  price: number;
  engineDisplacement?: number;
  tankCapacity?: number;
  cuttingLevelsAmount?: number;
  cableLength?: number;
  bladesAmount?: number;
  accumulatorAmount?: number;
  accumulatorCapacity?: number;
  color?: string;
}
