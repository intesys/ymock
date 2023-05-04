# Roadmap

### Inbox

_"Inbox" if for tasks that are still uncategorized._

### Foundation

Foundational tasks that define the essence of the app and its inner workings.
This task list should ideally be completed and not receive any new tasks
once the app reaches a MVP state.

- [x] Define & implement a way to seamlessly install and use the library as a dependency in an existing project
  - [x] In order to handle the relationship between yMock and the Demo App, without contaminating each other's codebases with conditionals and such, convert the package to a monorepo with [TurboRepo](https://turbo.build/repo/)
    - [x] Fix worker initialization
    - [x] Fix yMock routing
    - [x] Fix unit tests
  - [x] Run yMock from its own directory in the host app's server (see: <https://github.com/intesys/ymock/tree/feature/upgrade-vitejs>)
  - [x] Find a solution to run yMock with its own routing, without contributing the host app's history stack
    - [x] Switch to hash routing
  - [x] Find a way to develop the client in stand-alone mode with a mock worker
    - [x] Remove all occurrences of hosted/stand-alone mode, etc
  - [x] Create an automated process (like the msw init script) to install yMock's build into a subdir in the host project's public dir
  - [x] Update README to reflect the new implementation
  - [ ] Create at least another host app that is not built with vite to check that everything still works as expected
  - [x] Setup a dev workflow that:
    - [x] Runs client, launcher & host on their own dev server, in parallel
    - [x] Builds launcher & client _before_ running dev on the host app
    - [x] Imports launcher into host as an actual npm dependency, referencing the dist assets
    - [x] Copies the client build into host, reproducing how it should work in the context of the end user's project
    - [x] Rebuilds launcher & client on any dev change, and copies client into host

### Features

"Stories" or features, that are user-facing in nature;
ask yourself: "will the end user see or use the result of this task?"

- [ ] Implement company theme
- [ ] Implement UI animations
- [ ] Finalize Settings section (sidebar objects, data structure)
- [ ] Implement data store for data persistence/exporting (see: <https://github.com/intesys/ytestbook/issues/3>)
- [x] Add breadcrumb to navbar
- [x] Enable colorScheme in settings
- [x] The app should run `msw init` instead of copying the init script to the dist folder
- [x] Restructure routing
- [x] Implement global state

### Issues

Stuff that needs fixing.

- [ ] Un-break broken functionality (regressions due to an unfinished refactor)
  - [ ] Ability to individually toggle mocks
  - [ ] Mock overrides should appear in UI when submitted
  - [ ] Global VS local state
  - …
- [ ] Fix light theme
- [ ] Fix TS issues
- [x] yMock's postinstall script no longer works when handled by turbo in the context of the dev script
- [x] The `/demo` route should be hidden in production
- [x] Fix sidebar mapping in standalone mode
- [x] There's something not 100% working with the `__ymock` basepath

### Distribution

What we need to do to distribute the app on the npm registry.

- [ ] Define how the module(s) will be packaged
  - [x] Unbundle "Launcher" into its own workspace
    - [x] Write build script for the Launcher workspace, setup package.json
  - [ ] Write build script for the yMock workspace, setup package.json
- [ ] Test a real-life installation

### Maintenance

Routine maintenance tasks or the odd (hot)fix.

- [ ] …

### Optimizations/Refactors

Stuff that works, but could work better; tooling, code quality, and DX-related tasks.

- [ ] Migrate contexts to global state
- [ ] Implement <https://turbo.build/repo/docs/getting-started/create-new#understanding-tsconfig> in monorepo
- [ ] Implement <https://turbo.build/repo/docs/getting-started/create-new#understanding-eslint-config-custom> in monorepo
- [ ] Integrate TS fixes from <https://github.com/intesys/ymock/tree/feature/upgrade-vitejs>
- [x] Migrate to Vite
- [x] Refactor main route like settings (dynamic sub-routes with Outlet)
- [x] Refactor Body component as generic component

### Contributions

PR integrations, etc.

- [ ] Evaluate <https://github.com/intesys/ymock/pull/14>

---

###### Legend

- A `?` at the start of a task denotes an optional/nice-to-have feature, or in general something you're still considering if it's worth implementing.
