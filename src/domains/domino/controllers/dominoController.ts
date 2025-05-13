import { DominoSet } from "../models/dominoSet"; 
import { defaultDominoes } from "../models/defaultDominos"; 

export const createDominoSet = (): DominoSet => {
  return new DominoSet([...defaultDominoes]);
};
