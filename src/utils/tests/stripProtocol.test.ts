const { stripProtocol } = require("../index");

test("Tests stripProtocol utility", () => {
  expect(stripProtocol("https://jsonplaceholder.typicode.com/todos/100")).toBe(
    "jsonplaceholder.typicode.com/todos/100"
  );
});
