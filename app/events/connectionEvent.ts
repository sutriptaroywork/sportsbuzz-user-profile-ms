import ConnectionReadyEvent from '@buzzsports/sportsbuzz11-ready-event';

import mongoConfig from '@/connections/database/mongodb/mongoConfig';
import redisConfig from '@/connections/redis/redisConfig';
import rabbitmqConfig from '@/connections/rabbitmq/rabbitmqConfig';
import mysqlConfig from '@/connections/database/mysql/mysqlConfig';

const MONGO_CONNECTION = mongoConfig.config.length;
const REDIS_CONNECTION = redisConfig.config.length;
const RABBITMQ_CONNECTION = rabbitmqConfig.config.length;
const MYSQL_CONNECTION = mysqlConfig.config.length;

const TOTAL_CONNECTION = MONGO_CONNECTION + REDIS_CONNECTION + RABBITMQ_CONNECTION + MYSQL_CONNECTION;
// const TOTAL_CONNECTION = MONGO_CONNECTION + REDIS_CONNECTION + MYSQL_CONNECTION;
// const TOTAL_CONNECTION = REDIS_CONNECTION + MYSQL_CONNECTION;
console.log('TOTAL_CONNECTION', TOTAL_CONNECTION);
const connectionEvent = new ConnectionReadyEvent(TOTAL_CONNECTION);

connectionEvent.on('ready', () => {
  console.log('****ALL CONNECTION ESTABLISHED*****');
});

export default connectionEvent;
