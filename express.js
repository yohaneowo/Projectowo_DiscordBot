const express = require("express")
const app = express()
const eventManager = require("./handlers/CustomEvent")

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/TMDB_Auth/:userId", (req, res) => {
  // 这里你可以获取到你的请求令牌
  const isDenied = req.query.denied === "true"
  const userId = req.params.userId
  if (isDenied) {
    // 认证被拒绝
    eventManager.emit("TMDB_authentication", {
      request_token: req.query.request_token,
      status: "denied",
      triggeredBy: `${userId}`
    })

    res.send(`User ID: ${userId} Authentication denied!`)
  } else {
    // 认证通过
    eventManager.emit("TMDB_authentication", {
      request_token: req.query.request_token,
      status: "approved",
      triggeredBy: `${userId}`
    })

    res.send(`User ID: ${userId} Authentication successful!`)
  }
})

module.exports = app
