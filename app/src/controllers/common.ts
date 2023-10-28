// external packages
import { Response, Request } from 'express';

import config from '@/configs/main';
import { AwsS3Provider } from '@/library/AWS-Provider/awsS3Provider';

// enums
import { HTTPStatus } from '@/enums/statusType/statusCommon';
import { messages } from '@/enums/messageTypeEnums/general';

// services
import StatesService from '@/src/services/statistics/states';

// helpers
import { catchError, checkValidImageType } from '@/helpers/utility';

export default class CommonController {
    private awsS3Provider: AwsS3Provider;
    private statesService: StatesService;

    constructor() {
        this.awsS3Provider = new AwsS3Provider();
        this.statesService = new StatesService();
    }

    public getSignedUrl = async (req: Request, res: Response) => {
        try {
            const userLanguage = req.headers.userLanguage ? (req.headers.userLanguage as string | undefined) : 'English'
            const { sFileName, sContentType } = req.body

            const valid = checkValidImageType(sFileName, sContentType)
            if (!valid) return res.status(HTTPStatus.BAD_REQUEST).jsonp({ status: HTTPStatus.BAD_REQUEST, message: messages[userLanguage].invalid.replace('##', messages[userLanguage].image) })

            const fileKey = `${Date.now()}_${sFileName}`;
            const params = {
            Bucket: config.S3_BUCKET_NAME,
            Key: config.s3UserProfile + fileKey,
            Expires: 300,
            ContentType: sContentType
            }
            const data = await this.awsS3Provider.signedUrl(sFileName, sContentType, config.s3UserProfile)
            return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].presigned_succ, data })
        } catch (error) {
            return catchError('getSignedUrl', error, req, res)
        }
    }

    public getStatesList = async (req: Request, res: Response) => {
        try {
          const userLanguage = req.headers.userlanguage ? (req.headers.userlanguage as string | undefined) : 'English'
          const query = req.query.eStatus ? { eStatus: (req.query.eStatus as string).toUpperCase() } : {}

          const states = await this.statesService.getStatesListByStatus(query, { sName: 1, id: 1, _id: 0, eStatus: 1 })
          if (!states) return res.status(HTTPStatus.NOT_FOUND).jsonp({ status: HTTPStatus.NOT_FOUND, message: messages[userLanguage].not_exist.replace('##', messages[userLanguage].cUserStates) })

          return res.status(HTTPStatus.OK).jsonp({ status: HTTPStatus.OK, message: messages[userLanguage].success.replace('##', messages[userLanguage].cUserStates), data: states })
        } catch (error) {
          return catchError('Users.states.get', error, req, res)
        }
    }
}
