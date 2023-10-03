import { BUTTON, BUTTON_TEXT, buttonStyle } from "../config/host";
import { ROOT, WINDOW_TITLE } from "../config/yMock";

/**
 * Button used by host applcation to open yMock
 */
export const getButton = (window: Window) => {
  let element = window.document.getElementById(BUTTON);
  if (!element) {
    // create new
    element = window.document.createElement("button");
    element.setAttribute("id", BUTTON);
    element.appendChild(document.createTextNode(BUTTON_TEXT));
    Object.entries(buttonStyle).forEach(([property, value]) =>
      element!.style[property] = value
    )
  }

  window.document.body.appendChild(element);
  return element;
}

export const scaffoldHtml = (window: Window) => {
  window.document.write(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${WINDOW_TITLE}</title>
</head>
<body>

</body>
</html>`
  )
}

/**
 * Return yMock root HTML Element
 * If it doesn't exist, it creates it first
 */
export const getRoot = (window: Window) => {
  let element = window.document.getElementById(ROOT);
  if (!element) {
    element = window.document.createElement("div");
    element.setAttribute("id", ROOT);
  }
  window.document.body.appendChild(element);
  return element;
}
