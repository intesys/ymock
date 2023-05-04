/* ---------------------------------
postinstall.js

This script's purpose is to copy
yMock's bundle into the host project's
public dir; said dir could be specified
in the host project's package.json,
if the user followed msw's docs.

msw already provides public dir discovery
logic in their init script, and being yMock
a companion app to msw, it makes sense to
follow their conventions and even reuse
their init code.

--------------------------------- */

import { constants, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { normalize, resolve } from "node:path";
import { access, copyFile, writeFile } from "node:fs/promises";
import { template, YMOCK_SUPPORT_DIR_NAME } from "./constants.js";

// When the script is run in the user's repo,
// this var -- which is set in the script's invocation line -- won't exist.
const { REPO_MODE } = process.env;

(async function () {
  // When postinstall is run by npm as a result of the installation process,
  // process.env.INIT_CWD will have a value; in a development scenario,
  // we force it to the host app dir, which we know in advance.
  const parentPackageCwd = REPO_MODE
    ? normalize(`${process.cwd()}/..//host`)
    : process.env.INIT_CWD;

  // Copied & modified from:
  // https://github.com/mswjs/msw/blob/main/config/scripts/postinstall.js
  // 1. Check if "package.json" has "msw.workerDirectory" property set.
  const packageJson = JSON.parse(
    readFileSync(resolve(parentPackageCwd, "package.json"), "utf8")
  );

  if (!packageJson.msw || !packageJson.msw.workerDirectory) {
    return;
    //   TODO some error
  }

  // 2. Check if the worker directory is an existing path.
  const { workerDirectory: publicDir } = packageJson.msw;
  const HOST_PUBLIC_DIR = resolve(parentPackageCwd, publicDir);

  // > When executing the "postinstall" script,
  // >  the "process.cwd" equals the package directory
  const YMOCK_DIST_DIR = resolve(process.cwd(), "dist");

  console.log("⏳ Installing yMock…");

  try {
    // Determine if the host public dir exists;
    await access(HOST_PUBLIC_DIR, constants.F_OK);
    console.log("✅ Finding the host project's public dir… Done.");

    await access(YMOCK_DIST_DIR, constants.F_OK);
    await access(`${YMOCK_DIST_DIR}/assets`, constants.F_OK);
    console.log("✅ Finding yMock's dist dir… Done.");

    // Create yMock's support folder into the user's public dir;
    mkdirSync(`${HOST_PUBLIC_DIR}/${YMOCK_SUPPORT_DIR_NAME}/assets`, {
      // https://nodejs.org/api/fs.html#fsmkdirpath-options-callback
      // a recursive property indicating whether parent directories should be created.
      // Calling fs.mkdir() when path is a directory that exists results in an error
      // only when recursive is false.
      recursive: true,
    });
    console.log("✅ Creating yMock's support folder… Done.");

    // Dynamically get the bundle file's name from node_modules
    // If there are dotfiles, they'll come before the js file in the array.
    // TODO explicitly detect the file with js ext?
    const filename = readdirSync(`${YMOCK_DIST_DIR}/assets`).pop();
    // In case the dir was empty, `pop()` would return `undefined`
    if (!filename) throw new Error("❌ Cannot find yMock bundle.");

    await Promise.all([
      copyFile(
        `${YMOCK_DIST_DIR}/assets/${filename}`,
        `${HOST_PUBLIC_DIR}/${YMOCK_SUPPORT_DIR_NAME}/assets/${filename}`
      ).then(() => {
        console.log(
          "✅ Copying yMock's bundle to the project's public dir… Done."
        );
      }),
      writeFile(
        `${HOST_PUBLIC_DIR}/${YMOCK_SUPPORT_DIR_NAME}/index.html`,
        template(filename)
      ).then(() => {
        console.log(
          "✅ Copying yMock's HTML template to the project's public dir… Done."
        );
      }),
    ]);

    console.log("🎉 yMock was successfully installed!");
  } catch (err) {
    switch (err.syscall) {
      case "access":
        console.error(
          `❌ Failed to install yMock: couldn't find required directory "${err.path}".`,
          err
        );
        break;

      case "mkdir":
        console.error(
          `❌ Failed to install yMock: couldn't create required directory "${err.path}".`,
          err
        );
        break;

      case "copyfile":
        console.error(
          "❌ Failed to install yMock: couldn't find yMock's bundle.",
          err
        );
        break;

      default:
        console.error(
          "❌ Failed to install yMock. Additional error info: ",
          err
        );
    }
  }
})();
