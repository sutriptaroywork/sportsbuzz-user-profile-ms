import mainConfig from '@/configs/main';

interface OptionCOnfig {
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean,
  maxPoolSize?: number,
  minPoolSize?: number,
  readPreference?: "primary" | "primaryPreferred" | "secondary" | "secondaryPreferred" | "nearest",
}
interface MongoConfig {
  dbName: string,
  host: string,
  options: OptionCOnfig
  onConnect: () => void,
  onDisconnect: () => void
  onError: () => void
}

let mongoConfig;

function onConnect() {
  console.log('MongoDB Connection Created:', this.dbName);
}

function onDisconnect() {
  console.log('MongoDB Connection Disconnected:', this);
  mongoConfig = makeConfig();
}

function onError() {
  console.log('MongoDB Connection onError:', this);
}

const MongoOption: OptionCOnfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const createDbObject = (dbName: string, db: string, maxPoolSize: number, minPoolSize: number, maxIdleTimeMS: number)=>{
  console.log(`${mainConfig.MONGO_INITIAL}${mainConfig.MONGO_USER}:${mainConfig.MONGO_PASS}@${mainConfig.MONGO_ENDPOINT}/${db}`)
  return {
    dbName: dbName,
    host: `${mainConfig.MONGO_INITIAL}${mainConfig.MONGO_USER}:${mainConfig.MONGO_PASS}@${mainConfig.MONGO_ENDPOINT}/${db}`,
    options:{
      ...MongoOption,
      maxPoolSize: maxPoolSize,
      minPoolSize: minPoolSize,
      maxIdleTimeMS: maxIdleTimeMS
    },
    onConnect,
    onDisconnect,
    onError
  }
}

/**
 * for creating mongo config using AWS STS
 * @param dbName string
 * @param db db name in mongodb
 * @param dbPoolSize db poolsize
 * @returns config object
 */
const createDbObjectWithSts = (dbName: string, db: string, maxPoolSize: number, minPoolSize: number, maxIdleTimeMS: number) => {
  if(!mainConfig.AWS_STS_ACCESS_KEY) {
    return createDbObject(dbName, db, maxPoolSize, minPoolSize, maxIdleTimeMS);
  }
  // creating mongo connection url
  const encodedSecretKey = encodeURIComponent(mainConfig.AWS_STS_SECRET_KEY);
  const credentials = `${mainConfig.AWS_STS_ACCESS_KEY}:${encodedSecretKey}`;
  const url = new URL(`${mainConfig.MONGO_INITIAL}${credentials}@${mainConfig.MONGO_ENDPOINT}/${db}`);
  url.searchParams.set('authSource', '$external');
  url.searchParams.set('w', 'majority');
  url.searchParams.set('retryWrites', 'true');
  url.searchParams.set('authMechanism', 'MONGODB-AWS');
  url.searchParams.set(
    'authMechanismProperties',
    `AWS_SESSION_TOKEN:${mainConfig.AWS_STS_SESSION_TOKEN}`,
  );
  const mongoUrl = url.toString();
  // console.log(`${dbName}: ${mongoUrl}`);
  return {
    dbName: dbName,
    host: mongoUrl,
    options:{
      ...MongoOption,
      maxPoolSize: maxPoolSize,
      minPoolSize: minPoolSize,
      maxIdleTimeMS: maxIdleTimeMS
    },
    onConnect,
    onDisconnect,
    onError
  }
}

function makeConfig() {
  console.log('making monog config')
  const mongoConfig: { config: MongoConfig[] } = {
    config: [
      // createDbObjectWithSts('Users', config.USER_DB_NAME, Number(config.USERS_DB_POOLSIZE)),
      // createDbObjectWithSts('Admins', config.ADMIN_DB_NAME, Number(config.ADMINS_DB_POOLSIZE)),
      // createDbObjectWithSts('Statistics', config.STATISTICS_DB_NAME, Number(config.STATISTICS_DB_POOLSIZE)),
      // createDbObjectWithSts('Match', config.MATCH_DB_NAME, Number(config.MATCH_DB_POOLSIZE)),
      // createDbObjectWithSts('Game', config.GAME_DB_NAME, Number(config.GAME_DB_POOLSIZE)),
      // createDbObjectWithSts('SeriesLB', config.SERIES_LB_DB_NAME, Number(config.SERIES_LB_DB_POOLSIZE)),
      // createDbObjectWithSts('FantasyTeam', config.FANTASY_TEAM_DB_NAME, Number(config.FANTASY_TEAM_DB_POOLSIZE)),
      // createDbObjectWithSts('League', config.LEAGUE_DB_NAME, Number(config.LEAGUE_DB_POOLSIZE)),
      createDbObjectWithSts('CONNECTION', '', Number(mainConfig.MONGODB_MAX_POOL_SIZE), Number(mainConfig.MONGODB_MIN_POOL_SIZE), Number(mainConfig.MONGODB_IDLE_TIME_OUT)),
    ]
  };
  console.log('mongoConfig done before returning > ', mongoConfig)
  return mongoConfig;
}

mongoConfig = makeConfig()

export default mongoConfig;
