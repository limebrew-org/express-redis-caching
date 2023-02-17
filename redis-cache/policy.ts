import { redisclient } from "./redis"
import { CACHE_EXPIRATION_TIME } from "./constants"

//TODO: Cache Policy Implementation
class CachePolicy {
	//? Check if cache was hit
	static async isCacheHit(key:string) {
		const cacheHitResponse = await CachePolicy.getCache(key)

		//? If cache not found return false
		if(cacheHitResponse === null) return { hit: false }

		//? Else return true and the data
		return { hit: true, value: JSON.parse(cacheHitResponse) }
	}

	//? Get Cache by key
	static async getCache(key: string) {
		return await redisclient.get(key)
	}

	//? Set Cache with expiration time
	static async setCache (key: string, value:any) {
		await redisclient.set(key, value)
		await redisclient.expire(key,parseInt(CACHE_EXPIRATION_TIME))
	}

	//? remove least recently used cache (LRU)
	static async removeLeastRecentlyUsedCache (key: string) {
	}
}

export { CachePolicy }