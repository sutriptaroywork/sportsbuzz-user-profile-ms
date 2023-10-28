
import { FileData, FileType } from '../../enums/textractEnums/testractEnums';
import  * as AWS from 'aws-sdk';
import { HttpException } from '../HttpException/HttpException';
import { HTTPStatus } from '@/enums/statusType/statusCommon';

const MIN_CONFIDENCE = 80;
const awsConfig = {
  region: process.env.AWS_REGION || "ap-south-1",
  accessKeyId: process.env.AWS_KYC_ACCESS_KEY,
  secretAccessKey: process.env.AWS_KYC_SECRET_KEY,
}
// console.log(awsConfig)

export class AWS_Textract {
  textractClient: AWS.Textract;
  constructor() {
    this.textractClient = new AWS.Textract(awsConfig)
  }

  public documentOcr = async (fileData: FileData, type: FileType): Promise<string>  =>{
    const testractOCR = await this.textractFunction(fileData,type)
    let uniqueId: string = await this.getUniqueId(testractOCR.Blocks, type);
    return uniqueId;
  }

  /**
  * for analyzing and extracting AADHAAR/PAN Number
  * @param {*} obj obj.key will be used to fetch image from S3 and this image will go to textract
  * @param {string} type it must be [PAN, AADHAAR]
  */
private textractFunction = async (fileData: FileData, type: FileType) : Promise<AWS.Textract.Types.AnalyzeDocumentResponse> => {
    try {
      const params = {
          Document: {
              S3Object: {
                  Bucket: fileData.bucketName || process.env.S3_KYC_BUCKET_NAME,
                  Name: fileData.key
              }
          },
          FeatureTypes: ['FORMS'], // FORMS, TABLES, QUERY
      }
      console.log(params)
      // checking time
      // console.time("textract time");
      const data: AWS.Textract.Types.AnalyzeDocumentResponse = await this.textractClient.analyzeDocument(params).promise();
      // console.timeEnd("textract time");
      
      if (data && data.Blocks) {
        // extracting data
        // only return UID
        return data
      }
      else {
        throw new Error("Error in Extracting UID form AWS Textract");
      }
    }
    catch(e) {
      console.error("Textract Error", e);
    }
  }

  /**
  * using regular expression to match aadhaar/pan pattern
  * AADHAAR pattern https://www.geeksforgeeks.org/how-to-check-aadhar-number-is-valid-or-not-using-regular-expression/
  * PAN pattern https://www.geeksforgeeks.org/how-to-validate-pan-card-number-using-regular-expression/
  * 
  * AWS response format [PAGE, LINE, WORD]
  * PAGE: it will have whole page's data
  * LINE: Each line's data, AADHAAR/PAN number is being extracted from the LINE
  * LINE: if there are multiple match then selecting only first(for eg, if we combine aadhaar then its front and back both has aadhaar number)
  * LINE: checking minimum confidence
  * WORD: checking each word of AADHAAR/PAN number is PRINTED or not
  * 
  * @param {*} blocks AWS Textract response
  * @param {*} type [PAN, AADHAAR]
  * @returns AADHAAR/PAN Number
  */
  private getUniqueId = (blocks: AWS.Textract.Types.BlockList, type: FileType): string => {
    try {
      let lines: AWS.Textract.Types.BlockList = [];
      let regex, typeText;
      if(type === 'PAN') {
          regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
          typeText = 'PAN Card';
      }
      else {
          regex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
          typeText = 'Aadhaar Number';
      }
      // getting lines with aadhaar number
      for(let i = 0; i < blocks.length; i++) {
          let currentBlock = blocks[i];
          // checking using aadhaar regular expression
          if(currentBlock.BlockType === 'LINE' && regex.test(currentBlock.Text)) {
              lines.push(currentBlock);
          }
      }

      if(!lines.length) {
          throw new HttpException(HTTPStatus.BAD_REQUEST,`Invalid Image or ${typeText} not visible`)
      }

      // considering only first line with aadhaar
      const uIdLine: AWS.Textract.Types.Block = lines[0];

      // check aadhaar number confidence
      if(uIdLine.Confidence < MIN_CONFIDENCE) {
          throw new Error(`${typeText} not visible`)
      }

      // finding children(words)
      const uIdLineChild: AWS.Textract.Types.Relationship = uIdLine.Relationships.find(rel => rel && rel.Type === 'CHILD');
      
      if(!uIdLineChild || !uIdLineChild.Ids || !uIdLineChild.Ids.length) {
          // wont come here
          throw new Error("Invalid Image");
      }
        
      // now check in words that this aadhaar number is handwritten or not
      for(let i = 0; i < uIdLineChild.Ids.length; i++) {
          const uIdWord: AWS.Textract.Types.Block = blocks.find(block => block && block.Id === uIdLineChild.Ids[i]);
          if(!uIdWord) {
              // not possible
              throw new Error("Invalid Image");
          }

          // "HANDWRITING" || "PRINTED"
          if(uIdWord.TextType !== 'PRINTED') {
              throw new Error("Invalid Image");
          }
      }
      const uIdNumber = String(uIdLine.Text).split(' ').join('');
      return uIdNumber;
    }
    catch(e) {
      throw e;
    }
  }
}
// const data = new AWS_Textract();
// let d = data.textractFunction({ key: 'test_1685098100961.jpeg' }, FileType.AADHAAR)
//   .then((id) => {
//     console.log(id); // Handle the extracted uniqueId here
//   })
//   .catch((error) => {
//     console.error("Error:", error); // Handle the error here
//   })
  