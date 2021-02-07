const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/hello", (req, res) => {
  console.log(req.body.key);
  console.log(req.body.language);

  // check if database has a translation in this language for this key
  const nativeTranslationInDB = false;

  // if not, get content and feed it to Google Translation

  // const content = fetchnews(key)

  // const translation = translate()
  const translation = "hello";

  res.send({ express: translation });
});

app.post("/api/world", (req, res) => {
  console.log(req.body.post);
  console.log(req.body.key);
  console.log(req.body.language);

  // Add key, post (i.e. translation) and language to database

  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
