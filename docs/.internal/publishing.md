# npm Publishing Runbook

Developer-facing guide for releasing `svg-shards` and `@svg-shards/highlighter` to npm.

## Overview

Two independent npm packages live in one repository. **Each publish run releases exactly one package** — never both at once.

| Package            | npm name                                                                           | Version file                                                                         |
| ------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Core               | `[svg-shards](https://www.npmjs.com/package/svg-shards)`                           | `[package.json](../../package.json)`                                                 |
| Highlighter plugin | `[@svg-shards/highlighter](https://www.npmjs.com/package/@svg-shards/highlighter)` | `[plugins/svg-highlighter/package.json](../../plugins/svg-highlighter/package.json)` |

- **CI** (`.github/workflows/ci.yml`) runs on every push/PR to `main`: build, test, lint, format check.
- **Publish** (`.github/workflows/publish.yml`) runs only on a version git tag or manual workflow dispatch.

## One-time setup: npm Trusted Publishing

Configure once per package on [npmjs.com](https://www.npmjs.com/) before the first automated release.

For **each** package (`svg-shards` and `@svg-shards/highlighter`):

1. Open the package on npm (create it manually on first release if it does not exist yet).
2. Go to **Package settings → Trusted Publisher → Add**.
3. Fill in:

| Field                | Value           |
| -------------------- | --------------- |
| Provider             | GitHub Actions  |
| Organization or user | `Leritas`       |
| Repository           | `svg-shards`    |
| Workflow filename    | `publish.yml`   |
| Environment          | _(leave empty)_ |

1. Save.

Both packages trust the same workflow file. npm validates OIDC based on which `package.json` is published in a given run.

No long-lived `NPM_TOKEN` secret is required when Trusted Publishing is configured.

## Before any release (local checks)

**Core:**

```bash
npm run prepublishOnly
```

**Highlighter** (build core first — plugin resolves `svg-shards` via `file:../..` in devDependencies):

```bash
npm run build
npm run prepublishOnly --prefix plugins/svg-highlighter
```

Optional — inspect the tarball:

```bash
npm pack                    # in repo root → svg-shards-*.tgz
npm pack --prefix plugins/svg-highlighter   # → svg-shards-highlighter-*.tgz
tar -tzf svg-shards-*.tgz   # should contain dist/, README.md, LICENSE — no src/
```

## Release `svg-shards` (git tag — recommended)

| Step | Action                                                                                          |
| ---- | ----------------------------------------------------------------------------------------------- |
| 1    | Bump `"version"` in root `[package.json](../../package.json)`                                   |
| 2    | Commit and push to `main`                                                                       |
| 3    | Create tag: `git tag vX.Y.Z` — version in tag **includes** `v`, in package.json **without** `v` |
| 4    | Push tag: `git push origin vX.Y.Z`                                                              |
| 5    | GitHub → **Actions** → workflow **Publish** → wait for green run                                |
| 6    | npmjs.com → `svg-shards` → confirm new version                                                  |

Example:

```bash
# package.json: "version": "1.0.1"
git add package.json
git commit -m "chore: release svg-shards v1.0.1"
git push origin main
git tag v1.0.1
git push origin v1.0.1
```

## Release `@svg-shards/highlighter` (independent)

| Step | Action                                                                                                   |
| ---- | -------------------------------------------------------------------------------------------------------- |
| 1    | Ensure the required `svg-shards` version is **already published** on npm                                 |
| 2    | Bump `"version"` in `[plugins/svg-highlighter/package.json](../../plugins/svg-highlighter/package.json)` |
| 3    | If core had a **major** release, update `peerDependencies.svg-shards` range                              |
| 4    | Commit and push to `main`                                                                                |
| 5    | `git tag highlighter-vX.Y.Z` → `git push origin highlighter-vX.Y.Z`                                      |
| 6    | GitHub Actions → **Publish** → green run                                                                 |
| 7    | npmjs.com → `@svg-shards/highlighter` → confirm version                                                  |

Example:

```bash
# plugins/svg-highlighter/package.json: "version": "1.0.1"
git add plugins/svg-highlighter/package.json
git commit -m "chore: release @svg-shards/highlighter v1.0.1"
git push origin main
git tag highlighter-v1.0.1
git push origin highlighter-v1.0.1
```

**First highlighter release:** publish `svg-shards` to npm first. Users need a resolvable `peerDependencies` entry.

## Alternative: manual publish without a tag

Use when you need a hotfix or to retry after a failed workflow.

1. GitHub → **Actions** → **Publish** → **Run workflow**
2. Branch: `main`
3. Package: `svg-shards` or `highlighter`
4. Run

The workflow reads `"version"` from the already-committed `package.json`. Tag/version verification is **skipped** for manual runs — make sure the version bump is on `main` before triggering.

## Tag cheat sheet

| Git tag              | npm package               | Version file                           |
| -------------------- | ------------------------- | -------------------------------------- |
| `v1.2.3`             | `svg-shards`              | `package.json`                         |
| `highlighter-v0.3.1` | `@svg-shards/highlighter` | `plugins/svg-highlighter/package.json` |

One tag → one package. There is no single tag that publishes both.

## What the Publish workflow does

1. **Resolve** — determine target package from tag prefix or manual input.
2. **Verify** (tag pushes only) — tag semver must match `"version"` in the target `package.json`.
3. **Install** — `npm ci` at repo root.
4. **Build** — core only for `svg-shards`; core + plugin for `highlighter`.
5. **Publish** — `npm publish` (OIDC via Trusted Publishing); scoped package uses `--access public`.

## Common errors

| Symptom                                    | Cause                                | Fix                                                                        |
| ------------------------------------------ | ------------------------------------ | -------------------------------------------------------------------------- |
| `package.json version does not match tag`  | Tag and `"version"` disagree         | Fix version or delete/recreate tag                                         |
| OIDC / auth error in Publish job           | Trusted Publisher not configured     | Complete one-time npm setup above                                          |
| Highlighter install fails for users        | Plugin published before core         | Publish `svg-shards` first, then highlighter                               |
| `npm publish` tries to bundle `file:../..` | `svg-shards` still in `dependencies` | Use `peerDependencies` + `devDependencies file:../..` (already configured) |

## Related files

- `[.github/workflows/ci.yml](../../.github/workflows/ci.yml)`
- `[.github/workflows/publish.yml](../../.github/workflows/publish.yml)`
- Reference implementation: [eslint-plugin-angular-class-ordering](https://github.com/Leritas/eslint-plugin-angular-class-ordering)
