export interface Lawnmower {
  engine: 'Combustion' | 'Electric' | 'Accumulator';
  brand: string;
  model: string;
  engineDisplacement?: number;
  tankCapacity?: number;
  cuttingLevelsAmount?: number;
  cableLength?: number;
  bladesAmount?: number;
  accumulatorAmount?: number;
  accumulatorCapacity?: number;
  color?: string;
}
