import dotenv from "dotenv"
import { handleEnv } from "./utils"

//? Load Environment variables
dotenv.config(handleEnv())

//? Github API Server PORT
export const GITHUB_API_PORT = process.env.GITHUB_API_PORT

//? Get Redis Connection String
export const REDIS_CONNECTION_URL = process.env.REDIS_CONNECTION_URL