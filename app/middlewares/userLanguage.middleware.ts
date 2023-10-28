import { NextFunction, Request, Response } from 'express';

const userLanguageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const lang = req.header('Language')
  if (lang === 'English') {
    req.headers.userLanguage = 'English'
  }
  req.headers.userLanguage = 'English'
  next()
}

export default userLanguageMiddleware;
