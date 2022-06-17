# yMock

![yMock home](.preview/scrn-04.png)

A minimal administrative UI for [MSW.](https://mswjs.io)

### Features

- Lists the handlers (mocks) registered by MSW
- Lets you override the mocked response
- Lets you start/stop the worker

---

## Getting started

…

---

## Contributing

### Development

- From the root of the project, run: `yarn dev`
- The host app (which launches the Admin UI in a new window preloaded with `msw`) lives in `/`
- The Admin UI must be launched via the launcher button ("Launch yMock")

### Hosted mode (default)

![Demo app with launcher](.preview/scrn-03.png)

yMock's use case is to manage a `msw` instance launched by a host app;
This is the default behavior when you run `yarn dev`, so you'll have to launch
yMock from a "demo" page rendered at `/`; if you try to run yMock from
its own route (`/__${APP_NAME}`) you will get an error.

### Standalone mode

For cases when you want to develop yMock
_without_ tying it to the host app (for example,
you may want to rapidly iterate on the UI), enable
`STANDALONE_MODE` in `.env` (and re-run the server).
This way, the `msw` instance required by the app will
be pre-populated locally, without needing to look
for it in the window object.

---

### TODO

See [TODO](./TODO.md)
