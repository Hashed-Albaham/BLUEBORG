# Coolify / Railpack deployment notes

The repository is a monorepo, so Coolify must inspect the repository root (`/`) when using the root package.json and railpack.json. Railpack detects a Node application from a package.json in the inspected directory and uses the package `start` script when present. The deployment has an explicit root `start` script that delegates to `btuc-cms-prototype`.

The repository-owned Railpack configuration uses Node 22 and `pnpm start`. The root Dockerfile remains the deterministic alternative.

References:

- [Railpack configuration file](https://railpack.com/config/file/)
- [Railpack Node.js provider](https://railpack.com/languages/node/)
- [Coolify Railpack documentation](https://next.coolify.io/docs/applications/builds/railpack)
