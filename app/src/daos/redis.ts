import jwt from 'jsonwebtoken';

import { handleCatchError } from '@/helpers/utility';
import { redisClient } from '@/connections/redis/redis';

export default class RedisDao {
    public blackListToken = async (token: string) => {
        try {
            const sBlackListKey = `BlackListToken:${token}`
            const tokenData = jwt.decode(token, { complete: true })
            const tokenExp = tokenData.payload.exp
            redisClient.setex(sBlackListKey, tokenExp, 0)
        } catch (error) {
            handleCatchError(error)
        }
    }
}
