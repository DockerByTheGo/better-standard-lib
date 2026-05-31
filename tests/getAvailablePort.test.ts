import { createServer } from "node:net";
import { describe, expect, it } from "vitest";

import { getAvailablePort } from "../src/functions/getAvailablePort";

function closeServer(server: ReturnType<typeof createServer>) {
  return new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

function occupyPort(port: number) {
  const server = createServer();

  return new Promise<typeof server>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "0.0.0.0", () => resolve(server));
  });
}

describe("getAvailablePort", () => {
  it("returns a port starting from 3000 by default", async () => {
    const port = await getAvailablePort();

    expect(port).toBeGreaterThanOrEqual(3000);
    expect(port).toBeLessThanOrEqual(65535);
  });

  it("skips ports that are already in use", async () => {
    const firstAvailablePort = await getAvailablePort();
    const server = await occupyPort(firstAvailablePort);

    try {
      const nextAvailablePort = await getAvailablePort(firstAvailablePort + 1);

      await expect(getAvailablePort(firstAvailablePort)).resolves.toBe(nextAvailablePort);
    }
    finally {
      await closeServer(server);
    }
  });
});
