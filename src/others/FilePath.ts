import { panic } from "@better-standard-internal/functions";

export class FilePath<T extends string = string> {
  constructor(public readonly value: T) {
    if (!this.isValidPath(value)) {
      panic(`Invalid file path: ${value}`);
    }
  }

  private isValidPath(path: string): boolean {
    // Check if path is undefined, null, or empty
    if (path === undefined || path === null || typeof path !== 'string') {
      return false;
    }

    if (path.trim().length === 0) {
      return false;
    }

    // Check for null character (invalid on all systems)
    if (path.includes('\0')) {
      return false;
    }

    // Check for invalid characters on Linux/Unix
    // Only null byte is truly forbidden, but we can check for suspicious patterns
    const suspiciousPatterns = [
      /^\.\.$/,  // Don't allow just ".."
      /\/\.\.$/, // Don't allow ending with "/.."
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(path)) {
        return false;
      }
    }

    return true;
  }

  get getParts() {
    return this.value.split("/");
  }

  exists() {
    return true;
  }

  create() { }

  delete() { }
}

class FilePathBuilder {
  private readonly parts: string[] = [];
  constructor(private initial: string) { }

  addPart(part: string) {
    this.parts.push(`/${part}`);
    return this;
  }

  build() {
    return new FilePath(this.parts.join(""));
  }
}
