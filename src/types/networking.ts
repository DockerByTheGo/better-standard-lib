/**
 * Networking related types
 */

export type HttpVerb =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options';

export type PortNumber = number & { readonly __brand: 'PortNumber' };

export type StatusCode = number & { readonly __brand: 'StatusCode' };

export type Url = string & { readonly __brand: 'Url' };

export type WebSocketUrl = `ws://${string}` | `wss://${string}`;
