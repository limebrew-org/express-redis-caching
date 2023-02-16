import { Request, Response } from "express"
import { redisclient } from "./redis";
import axios from "axios"

const isCacheHit = async (username) => {
    const cacheFetchresponse = await redisclient.get(username)

    if(cacheFetchresponse === null)
        return { hit:false}
    return { hit:true, value: JSON.parse(cacheFetchresponse) }
}

const getGithubRepositories = async (username) => {
	const githubAPI = `https://api.github.com/users/${username}/repos`
	return await axios
		.get(githubAPI)
		.then((res) => {
			return { status: 200, data: res.data }
		})
		.catch((error) => {
			return { status: 500, error: error }
		})
}

const githubController = async (request: Request, response: Response) => {
	//? Grab username from request
	const username = request.query.username.toString()

	//? Handle bad request
	if (!username || username.length === 0)
		return response.status(400).json({
			status: 400,
			error: "Bad Request! Username must be provided"
		})
    
    //? Check if username entry exists in cache
    const cacheHitResponse = await isCacheHit(username)

    if(cacheHitResponse['hit'] == true){
        const data = cacheHitResponse.value
        return response
			.status(200)
			.json({
				status: 200,
				message: `${data.length} repositories were found for username: ${username}`,
				data: data
			})
    }

    //? If cache miss, Call Github API via Axios
	const githubRepositoryAPIResponse = await getGithubRepositories(username)

    //? If reposne status is 200
	if (githubRepositoryAPIResponse.status === 200){

        //? Set the data in cache and then return back the data
        await redisclient.set(username,JSON.stringify(githubRepositoryAPIResponse['data']))

        return response
			.status(200)
			.json({
				status: 200,
				message: `${githubRepositoryAPIResponse["data"].length} repositories were found for username: ${username}`,
				data: githubRepositoryAPIResponse["data"]
			})
    }
		
    //? If error then handle
	return response.status(500).json({ status: 500, error: githubRepositoryAPIResponse['error'] })
}

export { githubController }
