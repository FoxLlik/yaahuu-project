const Redis = require("ioredis")
const colors = require("cli-color")

let hasError = null

const redisClient = new Redis()

redisClient.on("error", (err) =>
{
    console.log('REDIS ERROR', err)
    hasError = true
})
redisClient.on("connect", (err) =>
{
    console.log(colors.bgWhite.black("Redis connected xD"));
    hasError = false
})

module.exports = redisClient
