const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const configuration = new Configuration({
  organization: "org-1K9ULx8u5RKMTrAMrBo5JMkV",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

//create a simple express api that calls the function

const app = express();
const port = 3080;

app.post("/", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
  res.json({
    data: response.data,
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
