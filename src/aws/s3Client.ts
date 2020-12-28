import AWS from 'aws-sdk';
import {COMPETITION_FOLDER} from "./getFromS3";

export class S3Client {
    client: AWS.S3;
    constructor() {
        this.client = new AWS.S3({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
        })
    }

    async put(request) {
        return new Promise((resolve, reject) => {
            this.client.putObject(request, (error, data) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            })
        })
    }

    createPutPublicJsonRequest(
        bucket,
        filename,
        contents
    ) {
        return {
            Bucket: bucket,
            Key: `${COMPETITION_FOLDER}${filename}`,
            Body: contents,
            ContentType: 'application/json; charset=utf-8',
            ACL: 'public-read',
            CacheControl: 'max-age=60'
        };
    }
}