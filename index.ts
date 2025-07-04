// Data Structures
export * from "./src/data_structures/array";
export * from "./src/data_structures/getSetClass";
export * from "./src/data_structures/group";
export * from "./src/data_structures/oneOf";
export * from "./src/data_structures/RecordCompatibeArray";
export * from "./src/data_structures/safestring";

// Error Handling
export * from "./src/data_structures/mapThatIsLikeInRust";
export * from "./src/data_structures/option";
export * from "./src/data_structures/result";

// Type Utilities
export * from "./src/type-level-functions";

// Utility Functions
export * from "./src/functions/logging";
export * from "./src/functions/mapObject";
export * from "./src/functions/panic";
// Re-export common types for backward compatibility
export type { OptionalPromise, OPromise } from "./src/type-level-functions/utility-types";
export type { URecord } from "./src/type-level-functions/utility-types";
export type { VoidCallback } from "./src/type-level-functions/utility-types";
export type { PromiseBoolean } from "./src/type-level-functions/utility-types";
export type {Last} from "./src/type-level-functions/getLastElementOfTuple"
export type { PortNumber } from "./src/types/networking";
export type { WebSocketUrl } from "./src/types/networking";
// Note: The following exports are kept for backward compatibility but are deprecated
// and will be removed in a future version. Please import from their new locations.
export * from "./src/data_structures/metaprogramming";

export * from "./src/data_structures/overload/export"
export * from "./src/type-level-functions/isBoolean"
export * from "./src/data_structures/base/export"