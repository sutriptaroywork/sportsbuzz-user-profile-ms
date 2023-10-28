// import * as Sentry from '@sentry/node';
import { Request } from 'express';
import { ObjectId } from 'mongodb';

import { HTTPStatus } from '@/enums/statusType/statusCommon';
import { messages } from '@/enums/messageTypeEnums/general';
import Constants from '@/configs/constants';
import { AdminDetailsQuery } from '@/interfaces/admin/adminProfile';

export const handleCatchError = (error, name = '') => {
    // if (process.env.NODE_ENV === 'production') Sentry.captureMessage(error)
    const { data = undefined, status = undefined } = error.response ?? {}
  
    if (error?.errorInfo?.code === 'messaging/registration-token-not-registered') return console.log(`${name} **********ERROR***********`, 'Token not registered.')
    if (!status) console.log(`${name} **********ERROR***********`, error)
    else console.log(`${name} **********ERROR***********`, { status, data })
}

export const catchError = (name, error, req, res) => {
    handleCatchError(error, name)
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).jsonp({
      status: HTTPStatus.INTERNAL_SERVER_ERROR,
      message: messages[req.headers.userLanguage].error
    })
}

export const isEmpty = (value) => {
  if ((typeof value === 'object' && Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
    return true
  } else if (!value) {
    return true
  }
  return false
}

export const checkValidImageType = (sFileName, sContentType) => {
  const extension = sFileName.split('.').pop().toLowerCase()
  const valid = Constants.imageFormat.find(format => format.extension === extension && format.type === sContentType)
  return !!valid
}

export const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key]
    }
    return obj
  }, {})
}

export const projectionFields = (body) => {
  const projection = {}
  for (var propName in body) {
    if (body[propName] !== null && body[propName] !== undefined) {
      projection[propName] = 1
    }
  }
  return projection
}

export const validatePIN = (pin) => {
  return /^\d{6}$/.test(pin)
}

export const defaultSearch = (val) => {
  let search
  if (val) {
    search = val.replace(/\\/g, '\\\\')
      .replace(/\$/g, '\\$')
      .replace(/\*/g, '\\*')
      .replace(/\+/g, '\\+')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\)/g, '\\)')
      .replace(/\(/g, '\\(')
      .replace(/'/g, '\\\'')
      .replace(/"/g, '\\"')
    return search
  } else {
    return ''
  }
}

export const queryToGetAdminList = (req: Request) => {
  const { mobile, internalAccount, email, datefrom, dateto } = req.query
  let search = req.query.search as string

  let query: AdminDetailsQuery = mobile ? { bIsMobVerified: true } : {}
  query = internalAccount ? { ...query, bIsInternalAccount: true } : query
  query = email ? { ...query, bIsEmailVerified: true } : query
  query = datefrom && dateto ? { ...query, dCreatedAt: { $gte: (datefrom), $lte: (dateto) } } : query

  if (search) search = defaultSearch(search)
  if (search && search.length) {
    if (ObjectId.isValid(search) && (new ObjectId(search)).toString() === search) {
      query = {
        ...query,
        _id: new ObjectId(search)
      }
    } else {
      query = {
        ...query,
        $or: [
          { sUsername: { $regex: new RegExp('^.*' + search + '.*', 'i') } },
          { sEmail: { $regex: new RegExp('^.*' + search + '.*', 'i') } },
          { sMobNum: { $regex: new RegExp('^.*' + search + '.*', 'i') } }
        ]
      }
    }
  }

  query = { ...query, eType: 'U' }

  return query
}

export const getPaginationValues = (obj) => {
  let { order, search } = obj
  const start = obj.start ? (obj.start) as string: 0
  const limit = obj.limit ? (obj.limit) as string: 10
  const sort = obj.sort ? obj.sort as string : 'dCreatedAt'

  const orderBy = order && order === 'asc' ? 1 : -1

  const sorting = { [sort]: orderBy }

  if (search) search = defaultSearch(search)

  return { start, limit, sorting, search }
}

export const getIp = (req) => {
  try {
    let ip = req.header('x-forwarded-for') ? req.header('x-forwarded-for').split(',') : []
    ip = ip[0] || req.socket.remoteAddress
    return ip
  } catch (error) {
    handleCatchError(error)
    return req.socket.remoteAddress
  }
}
