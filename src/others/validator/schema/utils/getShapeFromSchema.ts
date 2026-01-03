import { Schema } from "../types";

export type GetShapeFromSchema<T extends Schema> = {
  [K in keyof T]: T[K]["type"]["value"] extends "string" ? string : number
};