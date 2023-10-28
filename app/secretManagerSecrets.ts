const AWS = require('aws-sdk')

const constants = 'CONSTANT'

export default class SecretsManager {
    private region: string
    private accessKey: string
    private secretsAccessKey: string
    private client: any
    private sts: any

    constructor(options: any = {}) {
        this.region = options.region || process.env.AWS_REGION
        this.accessKey = options.accessKey || process.env.AWS_ACCESS_KEY,
            this.secretsAccessKey = options.secretsAccessKey || process.env.AWS_SECRET_KEY

        if (!this.region || !this.accessKey || !this.secretsAccessKey) {
            throw new Error("CREDENTIALS are Missing")
        }
        this.client = new AWS.SecretsManager({
            region: this.region,
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        });
        this.sts = new AWS.STS({
            // apiVersion: '2011-06-15',
            region: this.region,
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        });
        // console.log("region:", this.region,
        //     "accessKeyId:", process.env.AWS_ACCESS_KEY,
        //     "secretAccessKey:", process.env.AWS_SECRET_KEY);
    }

    private secretManager = async () => {
        return new Promise((resolve, reject) => {
            this.client.getSecretValue({ SecretId: process.env.NODE_ENV }, function (err, data) {
                if (err) {

                    reject(err)
                }
                else {
                    if ('SecretString' in data) {
                        const secrets = JSON.parse(data.SecretString);
                        resolve(secrets);
                    }
                    else {
                        reject("CREDENTIALS are MisMatch")
                    }
                }
            });
        })
    }

    private constantFromSecretManager = async () => {
        return new Promise((resolve, reject) => {
            this.client.getSecretValue({ SecretId: constants }, function (err, data) {
                if (err) {
                    reject(err)
                }
                else {
                    if ('SecretString' in data) {
                        const secrets = JSON.parse(data.SecretString);
                        resolve(secrets);
                    }
                    else {
                        reject("CREDENTIALS are MisMatch")
                    }
                }
            });
        })
    }

    /**
     *
     */
    private createStsSession = async () => {
        try {
          const roleSessionName = process.env.AWS_STS_SESSION_NAME_PREFIX || `AccessMongoDB-${process.env.NODE_ENV}`;
          const params = {
            RoleArn: process.env.AWS_STS_ACCESS_ROLE_ARN,
            RoleSessionName: `${roleSessionName}-${+new Date()}-${Math.floor(Math.random() * 10000)}`,
            DurationSeconds: process.env.AWS_STS_SESSION_DURATION || 900,
          }
          console.log('STS Assume Role Params:', params.RoleArn, params.RoleSessionName, params.DurationSeconds);
          const { Credentials }  = await this.sts.assumeRole(params).promise();

          if (!Credentials) {
            throw new Error('Failed to assume mongo db IAM role');
          }

          // set iam role secrets in env
          const { AccessKeyId, SessionToken, SecretAccessKey, Expiration } = Credentials;
          process.env.AWS_STS_ACCESS_KEY = AccessKeyId;
          process.env.AWS_STS_SECRET_KEY = SecretAccessKey;
          process.env.AWS_STS_SESSION_TOKEN = SessionToken;
          console.log('STS Session Expiration', Expiration);
        }
        catch(error) {
          console.error('createStsSession error', error);
          throw error;
        }
    };

    public getSecrets = async () => {
        const [secretManagerSecrets, constantSecrets] = await Promise.all([this.secretManager(), this.constantFromSecretManager()]);
        // your env will get the preference
        process.env = Object.assign(process.env, secretManagerSecrets);
        process.env = Object.assign(process.env, constantSecrets);
        await this.createStsSession();
        // for localhost

        // process.env.REDIS_HOST = 'host.docker.internal';
        // process.env.REDIS_PORT = '6379'
        // process.env.REDIS_2_HOST = 'host.docker.internal';
        // process.env.REDIS_2_PORT = '6379'
        // process.env.RABBITMQ_URL = 'amqp://host.docker.internal:5672';
        // process.env.DB_SQL_USER = '';
        // process.env.DB_SQL_PASSWORD = '';
        // process.env.DB_SQL_HOST = 'host.docker.internal';
        // process.env.DB_SQL_NAME = 'sportsbuzz11_stag';
        // process.env.DB_SQL_PORT = '4000';

        // process.env.REDIS_HOST = 'localhost';
        // process.env.REDIS_PORT = '6379'
        // process.env.REDIS_2_HOST = 'localhost';
        // process.env.REDIS_2_PORT = '6379'
        // process.env.RABBITMQ_URL = 'amqp://127.0.0.1:5672';
        // process.env.DB_SQL_USER = 'dalejan-sportsbuzz';
        // process.env.DB_SQL_PASSWORD = 'rkRt62mLB7HL57dj';
        // process.env.DB_SQL_HOST = 'localhost';
        // process.env.DB_SQL_NAME = 'sportsbuzz11_stag';
        // process.env.DB_SQL_PORT = '4000';



        process.env.DEPLOY_HOST_PORT = '1338'
        // process.env.MONGO_USER = 'MONGOSTAG'
        // process.env.MONGO_PASS = 'pQ5ywQLHWBtD33WI'
        // process.env.MONGO_USER = 'sutriptaroy11'
        // process.env.MONGO_PASS = 'm7wpQFZ6ZQ7ICUbA'
        // process.env.MONGO_USER = 'MONGODEV'
        // process.env.MONGO_PASS = 'mkJlUFaAB9AMszDD'
        // process.env.MONGO_USER = 'sutriptaroy11'
        // process.env.MONGO_PASS = 'MZLverkiuYw3f1Kj'

        process.env.DB_SQL_NAME = 'sportgully'
        process.env.DB_SQL_USER = 'sutriptaroy11'
        process.env.DB_SQL_PASSWORD = 'm7wpQFZ6ZQ7ICUbA'
        process.env.DB_SQL_HOST = 'localhost'
        process.env.DB_SQL_PORT = '3306'
        process.env.DB_SQL_MAX_POOLSIZE = '20'
        process.env.DB_SQL_MIN_POOLSIZE = '5'

        process.env.REDIS_NAME = 'REDIS 1'
        process.env.REDIS_HOST = 'localhost'
        process.env.REDIS_PASSWORD = 'm7wpQFZ6ZQ7ICUbA'
        process.env.REDIS_2_NAME = 'REDIS 2'
        process.env.REDIS_2_HOST = 'localhost'
        process.env.JWT_SECRET = 'aAbBcC@test_123'

        // console.log(process.env)
    }
}
