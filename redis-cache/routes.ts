import express from "express"
import { githubController } from "./controller"

const ghAPIRouter = express.Router()

ghAPIRouter.get("/github", githubController)

export { ghAPIRouter }
