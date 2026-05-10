import { matchStringSimple } from "../../index";

console.log("--- matchStringSimple ---");

type Route = "home" | "settings" | "profile";

const route = "settings" as Route; //! its neded to assert the type here, because TypeScript can't infer it from the string literal alone and it narrows it down to just settings

const title = matchStringSimple(route, {
  settings: () => "Settings",
  profile: () => "Your profile",
  home: () => "Home",
});

console.log("Resolved title:", title);
