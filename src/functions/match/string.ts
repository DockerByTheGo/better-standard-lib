
/// TODO: add better intellisense on the reutrn type

export function matchStringSimple<T extends string, R>(
  value: T,
  cases: { [K in T]: (value: K) => R }
): R {
  return cases[value](value);
}
type Status = "idle" | "loading" | "success" | "error";

const status = "success" as Status;

const message = matchStringSimple(status, {
  idle: () => "Waiting",
  loading: () => "Loading...",
  success: () => "Done",
  error: () => "Failed",
});


function TFn(v: "undefined" | "defined") {
  return matchStringSimple(v, {
    "defined": () => "",
    
  });
}


console.log(message)