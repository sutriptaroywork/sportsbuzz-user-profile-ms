import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import connections from './connections';
import errorMiddleware from './middlewares/error.middleware';
import { HTTPStatus } from './enums/statusType/statusCommon';
import adminProfileRoutes from './src/routes/profileRoutes/adminProfile';
import userProfileRoutes from './src/routes/profileRoutes/userProfile';

const app = express();
connections;
try {
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev', {
  skip: function (req: Request, res: Response) { return req.url === '/health-check'}
}));

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.get('/addServiceNameBaseURL', (req: Request, res: Response): void => {
  res.json({
    message: `Welcome to Sportsbuzz11 with ${process.env.NODE_ENV} environment`
  });
});

app.use('/api', new adminProfileRoutes().router);
app.use('/api', new userProfileRoutes().router);

app.get('/health-check', (req, res) => {
  const sDate = new Date().toJSON();
  return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, sDate });
});

app.use(errorMiddleware);

app.use(function onError(err, _req, res, _next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  console.log(err);
  res.statusCode = 500;
  res.end(`error: "Something went wrong: " +`);
});
} catch (error) {
  console.log(error)
}

module.exports = app;
