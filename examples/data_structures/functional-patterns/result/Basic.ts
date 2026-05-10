import { BasicResult, ResultError, ResultSuccess } from "../../../../index";

console.log("--- BasicResult ---");

type DivideError = { "division-by-zero": ResultError<"division-by-zero"> };
type DivideResult = BasicResult<ResultSuccess<number>, DivideError>;

function divide(a: number, b: number): DivideResult {
  if (b === 0) {
    return new BasicResult(new ResultError("division-by-zero", "Cannot divide by zero."));
  }

  return new BasicResult(new ResultSuccess(a / b));
}

const success = divide(12, 3);
if (success.isOk()) {
  console.log("Success value:", success.unpack());
}

const failure = divide(12, 0);
if (failure.isError()) {
  console.log("Error:", failure.value.name, "-", failure.value.message);
}

const handled = divide(20, 5).try({
  ifSuccess: value => `Handled success: ${value}`,
  ifError: {
    "division-by-zero": error => `Handled error: ${error.message}`,
  },
});

console.log(handled.raw);
