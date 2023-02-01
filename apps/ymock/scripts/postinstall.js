/* ---------------------------------
postinstall.js
--------------------------------- */

import { constants, mkdirSync, readdirSync } from "node:fs";
import { access, copyFile, writeFile } from "node:fs/promises";
import { template } from "./constants.js";
// import {  } from 'node:path';

(async function () {
  // TODO
  // - Determine our CWD
  // - Determine if the user saved a public dir in package.json
  // const ABS_PUBLIC_DIR =
  const DIR = `../public`;

  console.log("Installing yMock…");

  try {
    // - Determine if the public dir exists;
    await access(DIR, constants.F_OK);
    console.log("Finding the host project's public dir… Done.");

    // - Create yMock's support folder into the user's public dir;
    mkdirSync(`../public/__ymock`);
    mkdirSync(`../public/__ymock/assets`);
    console.log("Creating yMock's support folder… Done.");

    // - Dynamically get the dist file's name from node_modules
    const filename = readdirSync("../node_modules/ymock/dist/").pop();
    // In case the dir was empty, `pop()` would return `undefined`
    if (!filename) throw new Error("Cannot find yMock bundle.");

    await Promise.all([
      copyFile(
        `../node_modules/ymock/dist/${filename}`,
        `../public/__ymock/assets/${filename}`
      ).then(() => {
        console.log(
          "Copying yMock's bundle to the project's public dir… Done."
        );
      }),
      writeFile("../public/__ymock/index.html", template(filename)).then(() => {
        console.log(
          "Copying yMock's HTML template to the project's public dir… Done."
        );
      }),
    ]);

    console.log("yMock was successfully installed!");
  } catch (err) {
    switch (err.syscall) {
      case "access":
        console.error("Failed to install yMock: no public dir found.", err);
        break;

      case "mkdir":
        console.error(
          "Failed to install yMock: yMock's support folder '__ymock' already exists.",
          err
        );
        break;

      case "copyfile":
        console.error(
          "Failed to install yMock: couldn't find yMock's bundle.",
          err
        );
        break;

      default:
        console.error("Failed to install yMock. Additional error info: ", err);
    }
  }
})();
