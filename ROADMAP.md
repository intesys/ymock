# Roadmap

### Inbox

_"Inbox" if for tasks that are still uncategorized._

### Foundation

Foundational tasks that define the essence of the app and its inner workings.
This task list should ideally be completed and not receive any new tasks
once the app reaches a MVP state.

- [ ] Define & implement a way to seamlessly install and use the library as a dependency in an existing project
  - [x] In order to seamlessly handle the relationship between yMock and the Demo App, without contaminating each other's codebases with conditionals and such, convert the package to a monorepo with [TurboRepo](https://turbo.build/repo/)
    - [ ] Fix worker initialization
    - [x] Fix yMock routing
    - [x] Fix unit tests
  - [ ] Run yMock from its own directory in the host app's server (see: <https://github.com/intesys/ymock/tree/feature/upgrade-vitejs>)
  - [x] Find a solution to run yMock with its own routing, without contributing the host app's history stack
    - [x] Switch to hash routing
  - [x] Find a way to develop the client in stand-alone mode with a mock worker
    - [x] Remove all occurrences of hosted/stand-alone mode, etc
  - [ ] Create an automated process (like the msw init script) to install yMock's build into a subdir in the host project's public dir
  - [ ] Update README to reflect the new implementation

### Features

"Stories" or features, that are user-facing in nature;
ask yourself: "will the end user see or use the result of this task?"

- [ ] Implement UI animations
- [ ] Finalize Settings section (sidebar objects, data structure)
- [ ] Implement company theme
- [ ] Implement data store for data persistence/exporting (see: <https://github.com/intesys/ytestbook/issues/3>)
- [x] Add breadcrumb to navbar
- [x] Enable colorScheme in settings
- [x] The app should run `msw init` instead of copying the init script to the dist folder
- [x] Restructure routing
- [x] Implement global state

### Issues

Stuff that needs fixing.

- [ ] Fix light theme
- [ ] Fix TS issues
- [x] The `/demo` route should be hidden in production
- [x] Fix sidebar mapping in standalone mode
- [x] There's something not 100% working with the `__ymock` basepath

### Maintenance

Routine maintenance tasks.

- [ ] …

### Optimizations/Refactors

Stuff that works, but could work better; tooling and DX-related tasks.

- [ ] Migrate contexts to global state
- [x] Migrate to Vite
- [x] Refactor main route like settings (dynamic sub-routes with Outlet)
- [x] Refactor Body component as generic component

---

###### Legend

- A `?` at the start of a task denotes an optional/nice-to-have feature, or in general something you're still considering if it's worth implementing.
