export default {
    AWS_STS_ACCESS_KEY: process.env.AWS_STS_ACCESS_KEY,
    AWS_STS_SECRET_KEY: process.env.AWS_STS_SECRET_KEY,
    AWS_STS_SESSION_TOKEN: process.env.AWS_STS_SESSION_TOKEN,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_INITIAL: process.env.MONGO_INITIAL,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_ENDPOINT: process.env.MONGO_ENDPOINT,
    MONGODB_MIN_POOL_SIZE: process.env.MONGODB_MIN_POOL_SIZE || 1,
    MONGODB_MAX_POOL_SIZE: process.env.MONGODB_MAX_POOL_SIZE || 10,
    MONGODB_IDLE_TIME_OUT: process.env.MONGODB_IDLE_TIME_OUT || 3600000,
    USER_DB_NAME: process.env.USER_DB_NAME,
    ADMIN_DB_NAME: process.env.ADMIN_DB_NAME,
    STATISTICS_DB_NAME: process.env.STATISTICS_DB_NAME,
    MATCH_DB_NAME: process.env.MATCH_DB_NAME,
    GAME_DB_NAME: process.env.GAME_DB_NAME,
    SERIES_LB_DB_NAME: process.env.SERIES_LB_DB_NAME,
    FANTASY_TEAM_DB_NAME: process.env.FANTASY_TEAM_DB_NAME,
    LEAGUE_DB_NAME: process.env.LEAGUE_DB_NAME,
    USERS_DB_POOLSIZE: process.env.USERS_DB_POOLSIZE || 10,
    ADMINS_DB_POOLSIZE: process.env.ADMINS_DB_POOLSIZE || 10,
    STATISTICS_DB_POOLSIZE: process.env.STATISTICS_DB_POOLSIZE || 10,
    MATCH_DB_POOLSIZE: process.env.MATCH_DB_POOLSIZE || 10,
    GAME_DB_POOLSIZE: process.env.GAME_DB_POOLSIZE || 10,
    SERIES_LB_DB_POOLSIZE: process.env.SERIES_LB_DB_POOLSIZE || 10,
    FANTASY_TEAM_DB_POOLSIZE: process.env.FANTASY_TEAM_DB_POOLSIZE || 10,
    LEAGUE_DB_POOLSIZE: process.env.LEAGUE_DB_POOLSIZE || 10,
    DB_SQL_NAME: process.env.DB_SQL_NAME,
    DB_SQL_USER: process.env.DB_SQL_USER,
    DB_SQL_PASSWORD: process.env.DB_SQL_PASSWORD,
    DB_SQL_HOST: process.env.DB_SQL_HOST,
    DB_SQL_PORT: process.env.DB_SQL_PORT,
    DB_SQL_DIALECT: process.env.DB_SQL_DIALECT,
    DB_SQL_HOST_REPLICA: process.env.DB_SQL_HOST_REPLICA,
    DB_SQL_MAX_POOLSIZE: process.env.DB_SQL_MAX_POOLSIZE,
    DB_SQL_MIN_POOLSIZE: process.env.DB_SQL_MIN_POOLSIZE,
    REDIS_NAME: process.env.REDIS_NAME,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_2_NAME: process.env.REDIS_2_NAME,
    REDIS_2_HOST: process.env.REDIS_2_HOST,
    REDIS_2_PORT: process.env.REDIS_2_PORT,
    s3UserProfile: process.env.S3_USER_PROFILE_PATH || 'Users/profile',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    bAllowDiskUse: process.env.MONGODB_ALLOW_DISK_USE || true,
}
