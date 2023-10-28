import { redisClient } from '@/connections/redis/redis';

export default class RedisClient {
  constructor() {}
  /**
   * name
   */
  public redisSetKey = (key, value, expiry = 60 * 60 * 60): Promise<any> => {
    return redisClient.set(key, value, 'EX' , expiry);
  };

  public redisGetKey = async (key): Promise<any> => {
    const data = await redisClient.get(key)    
    if (!data) return 
    return JSON.parse(data);
  };
}
