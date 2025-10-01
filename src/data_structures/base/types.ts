import {Pipe}  from "@better-standard-internal/data_structures/pipe/export";
import {Tick}  from "@better-standard-internal/data_structures/tick/export";
import {Map}  from "../map/export";

export interface IBaseValue<V> extends Pipe.Types.IPipeable<V>,
Tick.Types.Tick<V>,
Map.Types.Mapable<V> {
    
}