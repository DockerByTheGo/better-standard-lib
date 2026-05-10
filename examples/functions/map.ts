import { map } from "../../index";

console.log("--- map ---");

const total = map([5, 10, 15], values => values.reduce((sum, value) => sum + value, 0));
console.log("Total:", total);

const userLabel = map({ id: 7, name: "Rado" }, user => `${user.id}:${user.name}`);
console.log("User label:", userLabel);
