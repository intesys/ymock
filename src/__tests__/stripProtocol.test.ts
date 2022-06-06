const { stripProtocol } = require("../utils");

test("Tests stripProtocol utility with https", () => {
  expect(stripProtocol("https://jsonplaceholder.typicode.com/todos/100")).toBe(
    "jsonplaceholder.typicode.com/todos/100"
  );
});

test("Tests stripProtocol utility with http", () => {
  expect(stripProtocol("http://jsonplaceholder.typicode.com/todos/100")).toBe(
    "jsonplaceholder.typicode.com/todos/100"
  );
});

test("Tests stripProtocol utility with non-matching value", () => {
  expect(stripProtocol("jsonplaceholder.typicode.com/todos/100")).toBe(
    "jsonplaceholder.typicode.com/todos/100"
  );
});

test("Tests stripProtocol utility with falsy value", () => {
  expect(stripProtocol(undefined)).toBe("");
});

// workaround for `cannot be compiled under '--isolatedModules'`
export {};
