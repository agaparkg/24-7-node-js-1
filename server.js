// ESM
import express from "express";
import { users } from "./data.js";
import axios from "axios";

// CommonJS
// const express = require("express");

// This line creates an instance of the Express application. express() is a
// function exported by the Express module, and calling it returns a new
// instance of an Express application. The app variable is then used to
// configure routes, middleware, and other settings for your web application.
const app = express();
const url = "https://63000b629350a1e548e9abfc.mockapi.io/api/v1/students";

// This line defines a variable named port that will be used to determine the
// port on which your server will listen. It uses the logical OR (||) operator
// to check if the environment variable PORT is set. If it is set, it uses that
// value; otherwise, it defaults to 8000.
const port = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  //   res.send({
  //     message: "Welcome to Homepage",
  //     total_Users: users.length,
  //     users: users,
  //   });

  res.status(200).json({
    message: "Welcome to Homepage",
  });
});

// new Promise((res, rej) => {})
app.get("/students", async (req, res) => {
  //   res.send({
  //     message: "Welcome to Homepage",
  //     total_Users: users.length,
  //     users: users,
  //   });

  try {
    const response = await fetch(url);
    const data = await response.json();
    // const response = await axios.get(url);

    res.status(200).json({
      message: "List of students",
      total_students: data.length,
      students: data,
    });
    // res.status(200).json({
    //   message: "List of students",
    //   total_students: response.data.length,
    //   students: response.data,
    // });
  } catch (error) {
    res.status(400).json({
      message: "Data not found",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
