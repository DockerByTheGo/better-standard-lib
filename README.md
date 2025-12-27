# Better Standard Library

A TypeScript-first, ergonomic, and safe standard library inspired by Rust and functional programming paradigms. This package provides improved error handling, data structures, and utility types for modern TypeScript projects.

## Installation

```bash
npm install @blazyts/better-standard-library
```

## Features

- **Result & Option types** for safe error handling
- **Pattern matching** utilities
- **Async result wrappers**
- **Functional data structures** (arrays, groups, safe strings, etc.)
- **Metaprogramming helpers**
- **Logging and panic utilities**
- **Type-safe networking types**

## Example Usage

### Basic Result Creation and Pattern Matching

```typescript
import { Err, Ok } from "@blazyts/better-standard-library";

const success = Ok(42);
const failure = Err("Something went wrong");

// Pattern matching
const value = success.match({
  Ok: val => val * 2,
  Err: err => 0,
});

// Chaining operations
const result = success
  .map(val => val * 2)
  .mapErr(err => `Error: ${err}`);

console.log("Value:", value); // 84
console.log("Result:", result.unwrapOr(0)); // 84
```

### Error Handling Example

```typescript
import { Err, Ok, Result } from "@blazyts/better-standard-library";

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Err("Cannot divide by zero");
  }
  return Ok(a / b);
}

const result = divide(10, 2)
  .andThen(val => divide(val, 0))
  .mapErr(err => `Calculation failed: ${err}`);
```

### Async Operations Example

```typescript
import { asyncResult, Err, Ok, Result } from "@blazyts/better-standard-library";

async function fetchUser(id: number): Promise<Result<{ id: number; name: string }, string>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id > 0) {
        resolve(Ok({ id, name: "John Doe" }));
      }
      else {
        resolve(Err("Invalid user ID"));
      }
    }, 1000);
  });
}

async function fetchUserDetails(userId: number): Promise<Result<{ age: number }, string>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve(Ok({ age: 30 }));
      }
      else {
        resolve(Err("Failed to fetch user details"));
      }
    }, 1000);
  });
}

async function main() {
  const userId = 1;
  const result = await asyncResult(() => fetchUser(userId))
    .andThen(async (user) => {
      console.log("User:", user);
      return fetchUserDetails(user.id);
    })
    .map(details => ({ ...details, fullName: "John Doe" }))
    .mapErr(err => `Operation failed: ${err}`);

  if (result.isOk()) {
    console.log("Success:", result.unwrap());
  }
  else {
    console.error("Error:", result.unwrapErr());
  }
}

main();
```

### TypeScript Integration Example

```typescript
import { Err, Ok, Result } from "@blazyts/better-standard-library";

type User = {
  id: number;
  name: string;
};

function fetchUser(id: number): Result<User, string> {
  return Ok({ id, name: "John Doe" });
}

const user = fetchUser(1)
  .map(user => ({ ...user, fullName: user.name }))
  .unwrapOrThrow();
```

## Directory Structure

- `src/` — implementation
- `example-usage/` — runnable usage examples
- `tests/` — unit tests

## Contributing

Feel free to add more examples or improve existing ones! Each example should:

1. Be self-contained
2. Demonstrate a specific concept
3. Include proper error handling
4. Show best practices
5. Be well-documented

---

For more advanced usage, see the `example-usage/advanced-examples` and `example-usage/basic-examples` directories.

# better-standard-lib

# better-standard-lib

# better-standard-lib
