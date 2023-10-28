import config from '@/configs/main';

interface RedisConfig {
  name: string;
  host: string;
  port: number;
  password: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

function onConnect() {
  console.log('Redis Connection Created:', this.name);
}

function onDisconnect() {
  console.log('Redis Connection Disconnected:', this.name);
}

const redisConfig: { config: RedisConfig[] } = {
  config: [
    {
      name: config.REDIS_NAME,
      host: config.REDIS_HOST,
      port: Number(config.REDIS_PORT),
      password: config.REDIS_PASSWORD,
      onConnect,
      onDisconnect
    },
    {
      name: config.REDIS_2_NAME,
      host: config.REDIS_2_HOST,
      port: Number(config.REDIS_2_PORT),
      password: config.REDIS_PASSWORD,
      onConnect,
      onDisconnect
    }
  ]
};
export default redisConfig;
