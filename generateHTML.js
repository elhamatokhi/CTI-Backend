const fs = require("fs");

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Starter page</title>
</head>
<style>
    body{
        margin: 0;
        padding:0;
        font-family: sans-serif;
    }
</style>
<body>
    <h1>Welcome to Fun page</h1>
    <p>When action grows unprofitble, gather information; when information  grows unprofitble, sleep. Ursula K.Le Guin, <i>The Left Hand of Darkness</i></p>
</body>
</html>`;

fs.writeFile("funPage.html", htmlContent, (err) => {
  if (err) {
    console.error("Error writing file: ", err);
  } else {
    console.log("HTML file has been created successfully!");
  }
});
