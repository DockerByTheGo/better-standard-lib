import type { Result } from "../../index";

import { asyncResult, Err, Ok } from "../../index";

// Simulated async operations
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

  // Using asyncResult for better error handling
  const result = await asyncResult(() => fetchUser(userId))
    .andThen(async (user) => {
      return fetchUserDetails(user.id);
    })
    .map(details => ({
      ...details,
      fullName: "John Doe",
    }))
    .mapErr(err => `Operation failed: ${err}`);

  // Handle the result
  if (result.isOk()) {
  }
  else {
    console.error("Error:", result.unwrapErr());
  }
}

main();
