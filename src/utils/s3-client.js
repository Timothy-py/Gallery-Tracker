const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    },
    region: BUCKET_REGION
})

const upload = async (params) => {
    const command = new PutObjectCommand(params)
    await s3.send(command)
}

module.exports = {
    s3,
    upload
};