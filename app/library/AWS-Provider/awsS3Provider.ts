import AWS from 'aws-sdk'
import config from '@/configs/main'
export class AwsS3Provider {
  private s3 : any
  constructor(){
      this.s3 = new AWS.S3({
        region: process.env.AWS_REGION || "ap-south-1",
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      })
  }

  public getSignedUrl = async (params: any) : Promise<string> => {
    return new Promise((resolve, reject) => {
      this.s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err)
        resolve(url)
      })
    })
  }

  public signedUrl = async (sFileName, sContentType, s3Path) => {
    if (!sFileName) return {}
    return new Promise((resolve, reject) => {
      sFileName = sFileName.replace('/', '-')
      sFileName = sFileName.replace(/\s/gi, '-')

      const fileKey = `${Date.now()}_${sFileName}`
      const params = {
        Bucket: config.S3_BUCKET_NAME,
        Key: s3Path + fileKey,
        Expires: 300,
        ContentType: sContentType
      }

      this.s3.getSignedUrl('putObject', params, function (error, url) {
        if (error) {
          reject(error)
        } else {
          resolve({ sUrl: url, sPath: s3Path + fileKey })
        }
      })
    })
  }
}
