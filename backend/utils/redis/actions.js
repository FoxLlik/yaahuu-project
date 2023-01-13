const redisClient = require('./index')

module.exports =
{
    // redis set string дата хадгалахад ашиглана
    set: async function(key, value)
    {
        await redisClient.set(key, value)
    },

    // redis get дата
    get: async function(key)
    {
        var redisResult = await redisClient.get(key, (err, result) =>
        {
            if(err)
            {
                console.log(err);
                return null
            }
            else
            {
                return result
            }
        })

        try {
            return JSON.parse(redisResult)
        }
        catch {
            return redisResult
        }
    },

    // redis hmset obj дата хадгалахад ашиглана
    hmset: async function(key, obj)
    {
        var objList = []
        objList.push(key)

        Object.keys(obj).map((key) => {
            objList.push(key.toString())
            objList.push(obj[key] ? obj[key].toString() : '')
        })

        console.log('objList:', objList);
        await redisClient.hmset(objList)
    },

    // redis hgetall get obj дата
    hgetall: async function(key)
    {
        var redisResult = await redisClient.hgetall(key, (err, result) =>
        {
            if(err)
            {
                console.log(err);
                return null
            }
            else
            {
                return result
            }
        })
        return redisResult
    },

    setex: async function(key, obj)
    {
        await redisClient.setex(key, 600, JSON.stringify(obj))
    }
}
