const { stripBasePath } = require("../utils");

test("Tests stripBasePath utility with https", () => {
  expect(stripBasePath("https://jsonplaceholder.typicode.com/todos/100")).toBe("/todos/100");
});

test("Tests stripBasePath utility with http", () => {
  expect(stripBasePath("http://jsonplaceholder.typicode.com/todos/100")).toBe("/todos/100");
});

test("Tests stripBasePath utility with more path levels", () => {
  expect(stripBasePath("https://jsonplaceholder.typicode.com/x/y/z/todos/100?x=y&y=z")).toBe(
    "/x/y/z/todos/100?x=y&y=z"
  );
});

test("Tests stripBasePath utility without slashes", () => {
  expect(stripBasePath("jsonplaceholder.typicode.com")).toBe("jsonplaceholder.typicode.com");
});

test("Tests stripBasePath utility without protocol", () => {
  expect(stripBasePath("jsonplaceholder.typicode.com/xyz")).toBe("/xyz");
});

test("Tests stripBasePath utility with falsy value", () => {
  expect(stripBasePath(undefined)).toBe("");
});

// workaround for `cannot be compiled under '--isolatedModules'`
export {};
