import express from "express"
import routes from "./database_express"

const app = express()
// 静态文件服务
app.use(express.static("Projectowo_WebApp/dist"))
app.use(routes)

// 所有路由都返回 index.html，以便 Vue Router 处理路由
app.get("*", (req, res) => {
  res.sendFile("./Projectowo_WebApp/dist/index.html")
})

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'eventManag... Remove this comment to see the full error message
import eventManager from "./handlers/CustomEvent"
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

export default app
