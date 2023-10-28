const cachegoose = require('recachegoose')
import { handleCatchError } from '@/helpers/utility';

export default class CachegooseDao {
    public clearCache = async (key: string) => {
        try {
            cachegoose.clearCache(key)
        } catch (error) {
            handleCatchError(error)
        }
    }
}
