import express from "express"
import dbUtils from "@sqlConnection"
import axios from "axios"
const db = dbUtils.getDb()
require("dotenv").config({ path: __dirname + "/../.env" })

async function getUserDetails(
  userId: string,
  authToken: string | undefined
): Promise<any> {
  const url = `https://discord.com/api/users/${userId}`
  const headers = {
    Authorization: `Bot ${authToken}`
  }

  try {
    // console.log(authToken)
    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    console.error("Failed to fetch user details:", error)
    throw error
  }
}

const router = express.Router()

// 创建 SQLite3 数据库连接

// 处理 /api/top-users 请求
router.get("/api/get-usersRanking", async (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT user_id, COUNT(*) AS count FROM user_gameId GROUP BY user_id ORDER BY count DESC "
    )
    const rows = stmt.all()
    const updatedRows = await Promise.all(
      rows.map(async (row) => {
        const user_id = row.user_id
        const user_info = await getUserDetails(
          user_id,
          process.env.DEV_DISCORD_TOKEN
        )
        const avatar_id = user_info.avatar
        const avatar_url = `https://cdn.discordapp.com/avatars/${user_id}/${avatar_id}`
        const global_name = user_info.global_name
        return {
          ...row,
          avatar_url,
          global_name
        }
      })
    )
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(updatedRows)

    console.log(updatedRows)
  } catch (err) {
    console.error("Failed to fetch top users:", err)
    res.status(500).json({ error: "Failed to fetch top users" })
  }
})

// 处理 /api/top-users 请求
router.get("/api/get-userGameUID", async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM user_gameId WHERE user_id = ?")
    const rows = stmt.all(req.query.user_id)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(rows)
  } catch (err) {
    console.error("Failed to fetch top users:", err)
    res.status(500).json({ error: "Failed to fetch top users" })
  }
})
// 获取用户单个游戏信息
router.get("/api/get-userGameInfo", async (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT * FROM user_gameId WHERE user_id = ? AND game_id = ?"
    )
    const rows = stmt.all(req.query.user_id, req.query.game_id)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(rows)
    console.log(rows)
    console.log("youknow")
  } catch (err) {
    console.error("Failed to fetch user game:", err)
    res.status(500).json({ error: "Failed to fetch user game" })
  }
})
// 获取用户玩的游戏列表
router.get("/api/get-userGameList", async (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT DISTINCT * FROM user_gameId WHERE user_id = ?"
    )
    const rows = stmt.all(req.query.user_id)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(rows)
    console.log(rows)
  } catch (err) {
    console.error("Failed to fetch user game list:", err)
    res.status(500).json({ error: "Failed to fetch user game list" })
  }
})
// 获取单个游戏
router.get("/api/get-gameInfo", async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM game_list WHERE game_id = ?")
    const rows = stmt.all(req.query.game_id)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(rows)
    console.log(rows)
  } catch (err) {
    console.error("Failed to fetch game:", err)
    res.status(500).json({ error: "Failed to fetch game" })
  }
})

// 获取单个服务器
router.get("/api/get-serverInfo", async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM game_serverList WHERE game_id = ?")
    const rows = stmt.all(req.query.game_id)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(rows)
    console.log(rows)
  } catch (err) {
    console.error("Failed to fetch server:", err)
    res.status(500).json({ error: "Failed to fetch server" })
  }
})

// 获取游戏列表
router.get("/api/get-gameList", async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM game_list")
    const rows = stmt.all()
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(rows)
    // console.log(rows)
  } catch (err) {
    console.error("Failed to fetch game list:", err)
    res.status(500).json({ error: "Failed to fetch game list" })
  }
})
// 获取服务器列表
router.get("/api/get-serverList", async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM game_serverList")
    const rows = stmt.all()
    // console.log(rows)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(rows)
  } catch (err) {
    console.error("Failed to fetch server list:", err)
    res.status(500).json({ error: "Failed to fetch server list" })
  }
})

router.get("/api/get-Dead_gameList", async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM Dead_gameList")
    const rows = stmt.all()
    console.log(rows)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(rows)
  } catch (err) {
    console.error("Failed to fetch Dead_gameList:", err)
    res.status(500).json({ error: "Failed to fetch Dead_gameList" })
  }
})

// 遊戲玩家數量排行
router.get("/api/get-gameRanking", async (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT g.game_id, g.[gameName_zh-TW], COUNT(u.game_id) AS player_count FROM game_list g LEFT JOIN user_gameId u ON u.game_id = g.game_id GROUP BY g.game_id, g.[gameName_zh-TW] ORDER BY player_count DESC;"
    )
    const rows = stmt.all()
    console.log(rows)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(rows)
  } catch (err) {
    console.error("Failed to fetch Dead_gameList:", err)
    res.status(500).json({ error: "Failed to fetch Dead_gameList" })
  }
})

// 获取某個遊戲的玩家List,不重复
router.get("/api/get-gamePlayer", async (req, res) => {
  try {
    const stmt = db.prepare(
      "SELECT DISTINCT user_Id FROM user_gameId WHERE game_id = ?"
    )
    const rows = stmt.all(req.query.game_id)
    console.log(rows)
    const updatedRows = await Promise.all(
      rows.map(async (row) => {
        const user_id = row.user_id
        const user_info = await getUserDetails(
          user_id,
          process.env.DEV_DISCORD_TOKEN
        )
        const avatar_id = user_info.avatar
        const avatar_url = `https://cdn.discordapp.com/avatars/${user_id}/${avatar_id}`
        const global_name = user_info.global_name
        return {
          ...row,
          avatar_url,
          global_name
        }
      })
    )
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.json(updatedRows)
  } catch (err) {
    console.error("Failed to fetch Dead_gameList:", err)
    res.status(500).json({ error: "Failed to fetch Dead_gameList" })
  }
})
export default router
