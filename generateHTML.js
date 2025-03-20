const fs = require("fs");
const qr = require("qr-image");

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
        padding: 0;
        text-align: center;
    }

    .main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1rem;

    }
        
</style>
<body>
    <h1>Welcome to Fun page</h1>
    <div class="main">
    <p>When action grows unprofitble, gather information; when information  grows unprofitble, sleep. Ursula K.Le Guin, <i>The Left Hand of Darkness</i></p>
    <p>Scan the QR code to read more from Ursula K.Le</p>
    </div>
    <img src="my-qr.png">
</body>
</html>`;

fs.writeFile("funPage.html", htmlContent, (err) => {
  if (err) {
    console.error("Error writing file: ", err);
  } else {
    console.log("HTML file has been created successfully!");

    generateQR();
  }
});

// Generate the QR code

function generateQR() {
  // The Quote URL

  const quoteURL =
    "https://www.theguardian.com/books/2018/jan/24/a-life-in-quotes-ursula-k-le-guin";

  const qr_png = qr.image(quoteURL, { type: "png" });
  qr_png.pipe(fs.createWriteStream("my-qr.png"));

  console.log("QR code has been generated!");
}
