import { Mapable } from "../../../../index";

console.log("--- Mapable ---");

const counter = new Mapable(10);
console.log("Original raw value:", counter.raw);

const doubled = counter.map(value => value * 2);
console.log("After doubling:", doubled.raw);
console.log("valueOf():", doubled.valueOf());

const chained = Mapable
  .new("hello")
  .map(value => `${value} world`)
  .map(value => value.toUpperCase());

console.log("Chained result:", chained.raw);
