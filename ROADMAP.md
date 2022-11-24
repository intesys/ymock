# Roadmap

### Inbox

_"Inbox" if for tasks that are still uncategorized._

### Features

- [ ] Define & implement a way to seamlessly install and use the library as as dependency
- [ ] Implement UI animations
- [ ] Implement data store (see: <https://github.com/intesys/ytestbook/issues/3>)
- [ ] Finalize Settings (sidebar objects, data structure)
- [x] Add breadcrumb to navbar
- [x] Enable colorScheme in settings
- [x] Restructure routing
- [x] The app should run `msw init` instead of copying the init script to the dist folder
- [x] Implement global state

### Issues

- [ ] Fix light theme
- [x] The `/demo` route should be hidden in production
- [x] Fix sidebar mapping in standalone mode
- [x] There's something not 100% working with the `__ymock` basepath

### Maintenance

- [ ] In order to seamlessly handle the relationship between yMock and the Demo App, convert the package to a monorepo with [TurboRepo](https://turbo.build/repo/)
- [ ] Fix TS issues

### Optimizations

- [ ] ? Migrate to Vite
- [ ] Migrate contexts to global state
- [x] Refactor main route like settings (dynamic subroutes with Outlet)
- [x] Refactor Body component as generic component

---

###### Legend

- A `?` at the start of a task denotes an optional/nice-to-have feature, or in general something you're still considering if it's worth implementing.
