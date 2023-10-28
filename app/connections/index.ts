// importing all connections and starting it

import mongodbConnection, { UsersDBConnect } from './database/mongodb/mongodb';
import sequelize from './database/mysql/mysql';
import redisConnection from './redis/redis';
import rabbitmqConnection from './rabbitmq/rabbitmq';

mongodbConnection;
sequelize;
redisConnection;
rabbitmqConnection;
// console.log(UsersDBConnect)

export default null;
