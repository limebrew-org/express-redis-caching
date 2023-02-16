import * as redis from "redis"
import { REDIS_CONNECTION_URL } from "./constants"

// const redisclient = redis.createClient({
// 		socket: {
// 			host: "localhost",
// 			port: 6379
// 		}
// })

const redisclient = redis.createClient({ url: REDIS_CONNECTION_URL })

export { redisclient }
