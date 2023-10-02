import { BUTTON, BUTTON_TEXT, buttonStyle } from "../config/host";
import { ROOT, WINDOW_TITLE, styles } from "../config/yMock";

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

/**
 * Add mantine css style tag to yMock window.
 * You can add more css by adding it to styles variable
 */
export const addCss = (window: Window) => {
  const STYLE_ATTRIBUTE_ID = "data-style-id";
  const addStyle = (style: string, index: number) => {
    const id = `style-${index}`;
    window.document.querySelector<HTMLStyleElement>(`style[${STYLE_ATTRIBUTE_ID}="${id}]"`)?.remove();
    const element = window.document.createElement("style");
    element.setAttribute(STYLE_ATTRIBUTE_ID, id);
    element.setAttribute("type", "text/css");
    element.appendChild(window.document.createTextNode(style));
    window.document.head.appendChild(element);
  }

  // array of styles to laod
  styles.forEach(addStyle);
}
