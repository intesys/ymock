# yMock

![yMock home](.preview/scrn-04.png)

### What is yMock?

It's a development tool based on [MSW](https://mswjs.io) that offers a graphic interface for the developer to manage mock data and a service worker that runs underneath. By using yMock, the developer can see the list of endpoint calls to be intercepted by the worker, change the data each one should return in the response body, and turn on/off the worker interception as a whole or in each endpoint response individually. 

It is worth pointing out that, by using the service worker, the interception occurs in the network layer. Therefore the calls are listed and can be inspected in the network tab of your browser's development tools.
### What does it do?

- It presents a graphic interface that favors development experience;
- It uses a service worker to intercept API calls in the network layer;
- It lists the URLs registered by MSW to be intercepeted;
- It displays and allows the user to override the mocked response;
- It allows the user to start/stop the worker as a whole or in each URL individually.

---

## Getting started

### Development

- From the root of the project, run: `yarn dev`
- The host app (which launches the Admin UI in a new window preloaded with `msw`) can be addressed at `http://localhost:1234`
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
