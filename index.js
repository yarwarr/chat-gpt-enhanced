const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const configuration = new Configuration({
  organization: "org-Bp0csnr9TQ9i5BeAYmpyivQy",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

//create a simple express api that calls the function

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const port = 3080;

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
 
  const response = await openai.createCompletion({
    model: `${currentModel}`,////"text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
  });
});
app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  
  res.json({
    models: response.data.data,
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
