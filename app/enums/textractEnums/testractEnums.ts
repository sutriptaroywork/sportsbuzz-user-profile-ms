export interface FileData {
    bucketName?: string;
    key: string
}
  
export enum FileType {
    PAN = 'PAN',
    AADHAAR = 'AADHAAR',
    PENNY_DROP =  'PENNY_DROP'
}
