// ESM
import express from "express";
// CommonJS
// const express = require("express");

// This line creates an instance of the Express application. express() is a
// function exported by the Express module, and calling it returns a new
// instance of an Express application. The app variable is then used to
// configure routes, middleware, and other settings for your web application.
const app = express();

// This line defines a variable named port that will be used to determine the
// port on which your server will listen. It uses the logical OR (||) operator
// to check if the environment variable PORT is set. If it is set, it uses that
// value; otherwise, it defaults to 8000.
const port = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  res.send("Welcome to Homepage");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
