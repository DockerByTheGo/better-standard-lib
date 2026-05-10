import { ReturnFromSubfunction } from "../../index";

console.log("--- ReturnFromSubfunction ---");

const firstEven = ReturnFromSubfunction<number | undefined>(() => {
  return [1, 3, 5, 8, 11].find(value => value % 2 === 0);
});

console.log("First even number:", firstEven);

const uppercaseName = ReturnFromSubfunction(() => {
  const user = { name: "Rado" };
  return user.name.toUpperCase();
});

console.log("Uppercased name:", uppercaseName);
