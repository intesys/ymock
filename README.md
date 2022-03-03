# MSW Admin UI

![](.preview/scrn-01.png)

A minimal administrative UI for [MSW.](https://mswjs.io)

### Features

- Lists the handlers (mocks) registered by MSW
- Lets you override the mocked response
- Lets you start/stop the worker

---

## Contribute

### Development

- From the root of the project, run: `yarn dev`
- The Admin UI lives at `/`, and receives the `msw` instance
- The host app (which launches the Admin UI in a new window preloaded with `msw`) lives in `/demo`


### TODO

- [ ] The `/demo` route should be hidden in production
- [ ] There's something not 100% working with the `__ymock` basepath
