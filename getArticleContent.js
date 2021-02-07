function getArticleContent(url) {
  const request = require("request");

  const options = {
    method: "GET",
    url: "https://lexper.p.rapidapi.com/v1.1/extract",
    qs: {
      url: url,
      media: "1",
    },
    headers: {
      "x-rapidapi-key": "acaaabf69dmsh5bff64dcc5b255ap12e820jsn0b1e51fc58f6",
      "x-rapidapi-host": "lexper.p.rapidapi.com",
      useQueryString: true,
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let result = JSON.parse(JSON.stringify(body));
    let text = result.text;
    console.log(result.text);
  });
}

module.exports = getArticleContent;
