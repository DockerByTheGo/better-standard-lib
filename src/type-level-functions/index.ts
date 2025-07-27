export * from './generic-ones/utility-types';
export * from '../types/networking';


import * as gENERICoNES from './generic-ones/index'
import { Tuple } from './tuple/export';
import * as RECORD from "./record/index"
import { STRING } from './string';
export namespace TypeLevelFunctions {
    export import TUPLE = Tuple;
    export import Record = RECORD
    export import String = STRING 
    export import GenericOnes = gENERICoNES
}