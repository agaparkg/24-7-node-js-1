// ESM
import express from "express";
import "dotenv/config";
import { readFile, writeFile } from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const app = express();
// let todos = [{ text: "Todo 1", id: 1 }];

const port = process.env.PORT || 8000;

// Middleware to parse incoming requests with JSON payloads
// When a request is made with a Content-Type of application/json,
// this middleware parses the request body and makes the parsed JSON
// data available on req.body.
app.use(express.json());
// app.use()

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to Todos",
  });
});

// new Promise((res, rej) => {})
app.get("/products", async (req, res) => {
  const data = await readFile("./data.json", { encoding: "utf8" });

  const parsedData = JSON.parse(data);

  res.status(200).json(parsedData);
});

app.get("/products/:id", async (req, res) => {
  //   const id = req.params.id
  const { id } = req.params;

  const data = await readFile("./data.json", { encoding: "utf8" });

  const parsedData = JSON.parse(data);

  const singleProduct = parsedData.find((p) => p.id === id);

  res.status(200).json(singleProduct);
});

app.delete("/products/:id", async (req, res) => {
  //   const id = req.params.id
  const { id } = req.params;

  const data = await readFile("./data.json", { encoding: "utf8" });

  const parsedData = JSON.parse(data);

  const filteredData = parsedData.filter((p) => p.id !== id);

  await writeFile("./data.json", JSON.stringify(filteredData));

  res.status(200).json({ message: "Product has been deleted." });
});

app.post("/products", async (req, res) => {
  // req.params
  // req.query
  // req.body
  // console.log("req.params", req.params);
  // console.log("req.query", req.query);
  // console.log("req.body", req.body);

  const newProduct = req.body;

  newProduct.id = uuidv4();

  const data = await readFile("./data.json", { encoding: "utf8" });

  const parsedData = JSON.parse(data);

  parsedData.push(newProduct);

  await writeFile("./data.json", JSON.stringify(parsedData));

  res.status(200).json({ message: "Product has been successfully added." });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
