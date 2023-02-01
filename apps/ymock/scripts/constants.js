/* ---------------------------------
constants
--------------------------------- */

export const template = (filename) => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>yMock | A full-featured management GUI for MSW</title>
          <script type="module" crossorigin src="assets/${filename}"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
      `;
