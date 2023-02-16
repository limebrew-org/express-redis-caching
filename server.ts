import express from "express"
import cors from "cors"
import { redisclient } from "./redis-cache/redis"
import { ghAPIRouter } from "./redis-cache/routes"
import { GITHUB_API_PORT } from "./redis-cache/constants"

//? Connect to redis
(async () => {
	await redisclient.connect()
})()

//? Event Listener for ready state
redisclient.on("ready", () => {
	console.log("Redis Connected Successfully!")
})

//! Event Listener for error state
redisclient.on("error", (err) => {
	console.log("Error in connecting to Redis! Error: ",err)
})

//? Initialize Express app
const app = express()

// TODO: Set API port
const PORT = process.env.PORT || GITHUB_API_PORT

//TODO: Configure CORS
app.use(cors())

//TODO: Configure body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//? API routes
app.use("/api", ghAPIRouter)

//TODO: Listen from API Server port
app.listen(PORT, () => {
	console.log(
		`Github-Repo-API: API-Server running successfully on http://localhost:${PORT}`
	)
})
