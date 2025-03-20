import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

inquirer
  .prompt({
    message: "Enter your URL: ",
    name: "URL",
  })
  .then((answers) => {
    const URL = answers.URL;
    var qr_png = qr.image(URL, { type: "png" });
    qr_png.pipe(fs.createWriteStream("my-qr.png"));
  });
