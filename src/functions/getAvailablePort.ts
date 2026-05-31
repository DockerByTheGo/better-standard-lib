import { createServer } from "node:net";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const server = createServer();

    server.once("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EADDRINUSE" || error.code === "EACCES") {
        resolve(false);
        return;
      }

      reject(error);
    });

    server.once("listening", () => {
      server.close(() => resolve(true));
    });

    server.listen(port, "0.0.0.0");
  });
}

export async function getAvailablePort(startPort = 3000): Promise<number> {
  for (let port = startPort; port <= 65535; port++) {
    if (await isPortAvailable(port))
      return port;
  }

  throw new Error(`No available port found starting from ${startPort}`);
}
