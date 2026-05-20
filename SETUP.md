# Better Standard Library - Setup & Installation Guide

A TypeScript-first, ergonomic, and safe standard library inspired by Rust and functional programming paradigms.

## Table of Contents
- [Local Setup for Development](#local-setup-for-development)
- [Forking & Contributing](#forking--contributing)
- [Installation](#installation)
- [Local vs NPM Resolution](#local-vs-npm-resolution)

## Local Setup for Development

### Prerequisites
- Bun 1.0+ (recommended)
- Node.js 18+ (alternative)
- TypeScript 5.0+
- Git

### Initial Setup

1. **Clone the monorepo:**
   ```bash
   git clone <your-repo-url>
   cd diplomna-repo/main/project
   ```

2. **Install dependencies with Bun:**
   ```bash
   bun install
   ```

   Or with npm:
   ```bash
   npm install
   ```

3. **Navigate to the package:**
   ```bash
   cd utils/better-standard-lib
   ```

4. **Build the library:**
   ```bash
   bun run build-lib
   ```

### Development Workflow

- **Run tests:**
  ```bash
  vitest
  # or with watch mode
  vitest --watch
  ```

- **Type checking:**
  ```bash
  bun run tsc --noEmit
  ```

- **Linting & fixing:**
  ```bash
  bun run lint:fix
  ```

- **Watch mode for development:**
  ```bash
  bun run build-lib --watch
  ```

### File Structure
```
better-standard-lib/
├── src/                          # Source files
│   ├── data_structures/          # Core data structures (Result, Option, etc.)
│   ├── functions/                # Utility functions
│   ├── others/                   # Additional helpers
│   ├── type-level-functions/     # Type-level utilities
│   └── types/                    # TypeScript type definitions
├── examples/                     # Usage examples
├── tests/                        # Test files
├── index.ts                      # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Forking & Contributing

### Fork the Repository

1. **Click "Fork" on GitHub** to create your own copy

2. **Clone your fork locally:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/diplomna-repo.git
   cd diplomna-repo/main/project
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/diplomna-repo.git
   ```

4. **Keep your fork updated:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the `utils/better-standard-lib/src/` directory

3. **Test your changes:**
   ```bash
   npm test
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## Installation

### Option 1: From NPM (Production)

Install as a dependency in your project:

```bash
npm install @blazyts/better-standard-library
```

### Option 2: From Local Workspace (Development)

When working in the monorepo, the package is automatically available to other workspace packages using workspace protocol:

```json
{
  "devDependencies": {
    "@blazyts/better-standard-library": "workspace:*"
  }
}
```

This is already configured in dependent packages within the monorepo.

### Option 3: From Git (Custom Branch)

Install directly from a Git branch:

```bash
npm install https://github.com/YOUR-USERNAME/diplomna-repo.git#main
```

Or with a specific branch:

```bash
npm install https://github.com/YOUR-USERNAME/diplomna-repo.git#feature/your-feature-name
```

## Local vs NPM Resolution

### When to Use Local Resolution

**Use workspace protocol (`workspace:*`)** when:
- 🔧 Developing the library locally
- 🔗 Testing changes across multiple packages
- 🚀 Building features within the monorepo
- ⚡ Using Bun for faster development iteration

**Configuration in dependent package's `package.json`:**
```json
{
  "devDependencies": {
    "@blazyts/better-standard-library": "workspace:*"
  }
}
```

### When to Use NPM Resolution

**Use NPM package** when:
- 📦 Publishing to production
- 🌐 Using the library in external projects
- 🔒 Requiring a stable, published version
- 📍 Version pinning is important

**Installation:**
```bash
npm install @blazyts/better-standard-library@^1.0.0
```

### Configuration for Both

To support both local and NPM resolution:

1. **In the library's `package.json`:**
   - Ensure version is set: `"version": "1.0.0"`
   - Include build script: `"build-lib": "tsup index.ts --format cjs,esm --dts"`

2. **Build for NPM before publishing:**
   ```bash
   cd utils/better-standard-lib
   npm run build-lib
   npm publish
   ```

3. **Use in other projects:**
   - **Local (monorepo):** `"@blazyts/better-standard-library": "workspace:*"`
   - **External:** `"@blazyts/better-standard-library": "^1.0.0"`

## Features Overview

- **Result & Option types** - Safe error handling without exceptions
- **Pattern matching** - Rust-like pattern matching for TypeScript
- **Async wrappers** - Async result handling and error recovery
- **Data structures** - Group, Record, SafeString, and more
- **Functional utilities** - Map, filter, reduce with type safety
- **Logging & panic** - Structured logging and controlled panics
- **Metaprogramming** - Class builders, validators, schema helpers

## Troubleshooting

### Import errors in editor
- Make sure you've run `npm install` in the monorepo root
- Check that TypeScript language server has reloaded (reload VS Code window)

### Build fails
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)

### Tests failing
```bash
# Clean and reinstall
npm ci
# Run tests with verbose output
npm test -- --reporter=verbose
```

## Next Steps

- Read [README.md](./README.md) for features and examples
- Check [examples/](./examples/) directory for usage patterns
- Review test files in [tests/](./tests/) to understand behavior
