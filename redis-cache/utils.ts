import { redisclient } from "./redis"
import { CACHE_EXPIRATION_TIME } from "./constants"
import axios from "axios"

//TODO: Handle Environment Variables
const handleEnv = () => {
	if (process.env.NODE_ENV === "local") return { path: ".env.local" }
	if (process.env.NODE_ENV === "dev") return { path: ".env.dev" }
	if (process.env.NODE_ENV === "stg") return { path: ".env.stg" }
	if (process.env.NODE_ENV === "prod") return { path: ".env.prod" }
}


//TODO: Github Repository API
async function getGithubRepositories (username:string) {
	const githubAPI = `https://api.github.com/users/${username}/repos`
	return await axios
		.get(githubAPI)
		.then((res) => {
			console.log("Response Status: ",res.status)
			return { status: 200, data: res.data }
		})
		.catch((error) => {
			return { status: 500, error: error }
		})
}

export { handleEnv, getGithubRepositories }