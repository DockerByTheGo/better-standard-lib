import {Pipe}  from "@better-standard-internal/data_structures/Pipe/export";
import {Tick}  from "@better-standard-internal/data_structures/Tick/export";
import {Map}  from "../map/export";

export interface IBaseValue<V> extends Pipe.Types.IPipeable<V>,
Tick.Types.Tick<V>,
Map.Types.Mapable<V> {
    
}