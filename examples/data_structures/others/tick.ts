import { TickClass } from "../../../index";

console.log("--- Tick ---");

const timer = new TickClass({ job: "build", attempts: 0 });

const value = timer.tick(current => {
  current.attempts += 1;
  console.log("Inside tick callback:", current);
});

console.log("Returned value:", value);
