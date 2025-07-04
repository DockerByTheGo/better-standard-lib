# Example Usage of Better Standard

This directory contains various examples demonstrating how to use the better standard implementation.

## Structure

- `basic-examples/`: Simple examples showing fundamental concepts
- `advanced-examples/`: More complex usage patterns and best practices
- `error-handling/`: Examples of error handling patterns
- `typescript/`: TypeScript-specific examples and type safety demonstrations

## Getting Started

Each example is self-contained and can be run independently. Make sure to install the required dependencies before running any examples.

```bash
npm install
```

## Examples

### Basic Usage

```typescript
import { Err, Ok, Result } from "better-standard";

// Basic result creation
const success = Ok(42);
const failure = Err("Something went wrong");

// Pattern matching
const value = success.match({
    Ok: val => val,
    Err: err => 0
});

// Chaining operations
const result = success
    .map(val => val * 2)
    .mapErr(err => `Error: ${err}`);
```

### Error Handling

```typescript
import { Err, Ok, Result } from "better-standard";

function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return Err("Cannot divide by zero");
    }
    return Ok(a / b);
}

// Using the function
const result = divide(10, 2)
    .andThen(val => divide(val, 0))
    .mapErr(err => `Calculation failed: ${err}`);
```

### TypeScript Integration

```typescript
import { Err, Ok, Result } from "better-standard";

type User = {
    id: number;
    name: string;
};

function fetchUser(id: number): Result<User, string> {
    // Implementation
    return Ok({ id, name: "John Doe" });
}

// Type-safe error handling
const user = fetchUser(1)
    .map(user => ({
        ...user,
        fullName: user.name
    }))
    .unwrapOrThrow();
```

## Contributing

Feel free to add more examples or improve existing ones. Each example should:

1. Be self-contained
2. Demonstrate a specific concept
3. Include proper error handling
4. Show best practices
5. Be well-documented
