const { stripBasePath } = require("../index");

test("Tests stripBasePath utility", () => {
  expect(stripBasePath("https://jsonplaceholder.typicode.com/todos/100")).toBe(
    "/todos/100"
  );
});
