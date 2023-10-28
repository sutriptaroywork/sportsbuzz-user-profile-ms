import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '@/configs/main';

import RedisClient from '@/redis/redis';
import { HTTPStatus } from '@/enums/statusType/statusCommon';
import { messages } from '@/enums/messageTypeEnums/general';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')
  const userLanguage = req.headers.userLanguage ? (req.headers.userLanguage) as string | undefined : 'English';

  if (!token) {
      return res.status(HTTPStatus.UNAUTHORIZED).jsonp({
        status: HTTPStatus.UNAUTHORIZED,
        message: messages[userLanguage].err_unauthorized
      })
  }

  const redisClient = new RedisClient();

  const isBlackList = await redisClient.redisGetKey(`BlackListToken:${token}`)
  if (isBlackList) {
    return res.status(HTTPStatus.UNAUTHORIZED).jsonp({
      status: HTTPStatus.UNAUTHORIZED,
      message: messages[userLanguage].err_unauthorized
    })
  }

  let user: any = {}
  try {
    user = jwt.verify(token, config.JWT_SECRET)
  } catch (err) {
    return res.status(HTTPStatus.UNAUTHORIZED).jsonp({
      status: HTTPStatus.UNAUTHORIZED,
      message: messages[userLanguage].err_unauthorized
    })
  }

  if (!user) {
    return res.status(HTTPStatus.UNAUTHORIZED).jsonp({
      status: HTTPStatus.UNAUTHORIZED,
      message: messages[userLanguage].err_unauthorized
    })
  }

  if (user.eType === 'B') {
    return res.status(HTTPStatus.NOT_FOUND).jsonp({ status: HTTPStatus.NOT_FOUND, message: messages[userLanguage].user_blocked })
  }

  const ObjectId = mongoose.Types.ObjectId
  user._id = new ObjectId(user._id)

  if (!user?._id) {
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).jsonp({
      status: HTTPStatus.INTERNAL_SERVER_ERROR,
      message: messages[userLanguage].error
    })
  }
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).jsonp({
      status: HTTPStatus.UNPROCESSABLE_ENTITY,
      errors: errors.array()
    })
  }
  req.headers.user = JSON.stringify(user)
  next()
}

export default authMiddleware;
