import CommonDao from '@/src/daos/common';
import RedisDao from '@/src/daos/redis';
import CachegooseDao from '@/src/daos/cacheGoose';

export default class CommonService {
    private commonDao: CommonDao;
    private redisDao: RedisDao;
    private cachegooseDao: CachegooseDao;

    constructor() {
        this.commonDao = new CommonDao();
        this.redisDao = new RedisDao();
        this.cachegooseDao = new CachegooseDao();
    }

    public removeUnnecessaryFields = (user) => {
        this.commonDao.removeUnnecessaryFields(user)
    }

    public tokenBlacklisting = (token: string) => {
        this.redisDao.blackListToken(token)
    }

    public clearCache = (key: string) => {
        this.cachegooseDao.clearCache(key)
    }
}
