const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.listen(3000);

app.get("/getalltextfiles", (req, res) => {
  fs.readdir("D:/", (err, data) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const allfiles = data.filter((file) => file.endsWith(".txt"));

    res.json({
      message: "File retrived Successfully",
      allfiles: allfiles,
    });
  });
});

app.post("/createnewfile", (req, res) => {
  let date = new Date();
  let fileName = `${date.getFullYear()}-${(
    date.getMonth() + 1
  ).toString()}-${date.getDate()}-${date.getHours()}hrs-${date.getMinutes()}mins-${date.getSeconds()}secs`;
  fs.writeFile(`D:/${fileName.toString()}.txt`, `${date}`, "utf8", (err) => {
    if (err) {
      console.error("Error creating file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({
      message: "File Created Successfully",
    });
  });
});
