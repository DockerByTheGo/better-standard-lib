/**
 * @deprecated Import from '../type-utils' instead
 */

// Re-export from new location
export {
  IfNotUndefinedWithDefault,
  With,
  KeyOfOnlyStringKeys as keyofonlystringkeys,
  ValuesOf as valuesOf,
  RemoveNonStringKeys as removesNonStringKeysFromKeyOf,
  Pair as pair,
  GetFirst as getFirst,
  GetLast as getLast,
} from '../type-level-functions';

export * from '../type-level-functions/tuples';

// Deprecated type aliases for backward compatibility
import { OptionalObject as OptionalObjectType } from '../type-level-functions/utility-types';

export type OptionalObject<T> = OptionalObjectType<T>;

/**
 * @deprecated Use the individual exports from '../type-utils' instead
 */
export const afterfix = {
  // This is a placeholder for backward compatibility
  // The actual implementation should be moved to a proper utility function
} as const;

/**
 * @deprecated Use the individual exports from '../type-utils' instead
 */
export const prefix = {
  // This is a placeholder for backward compatibility
  // The actual implementation should be moved to a proper utility function
} as const;
