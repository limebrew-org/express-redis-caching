import { Request, Response } from "express"
import { getGithubRepositories } from "./utils"
import { CachePolicy } from "./policy"

//TODO: Github Repository API Controller
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
    const cacheHitResponse = await CachePolicy.isCacheHit(username)

	//? If Cache hit
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
		//? Grab the response data from Github API
		const repositories = githubRepositoryAPIResponse['data']

        //? Set the data in cache and then return back the data
		await CachePolicy.setCache(username,JSON.stringify(repositories))

		//? Send the response back to client
        return response
			.status(200)
			.json({
				status: 200,
				message: `${repositories.length} repositories were found for username: ${username}`,
				data: repositories
			})
    }
		
    //? If error then handle
	return response.status(500).json({ status: 500, error: githubRepositoryAPIResponse['error'] })
}

export { githubController }
