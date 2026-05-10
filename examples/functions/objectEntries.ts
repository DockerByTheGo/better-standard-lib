import { entries } from "../../index";

console.log("--- entries ---");

const config = {
  host: "localhost",
  port: 3000,
  secure: false,
};

for (const [key, value] of entries(config)) {
  console.log(`${String(key)} =>`, value);
}
