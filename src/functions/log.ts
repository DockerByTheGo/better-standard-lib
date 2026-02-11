/**
 * An alias for console.log, but with a semantic distinction:
 * - Use `console.log()` for temporary debugging during development
 * - Use `log()` for production-level logging that should remain in the codebase
 * 
 * This separation allows you to search for and remove `console.log` statements
 * without accidentally deleting important production logs.
 */
export const LOG = console.log