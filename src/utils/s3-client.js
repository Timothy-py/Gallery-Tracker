const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: BUCKET_REGION,
});

const s3_upload = async (params) => {
  const command = new PutObjectCommand(params);
  await s3.send(command);
};

const s3_signedUrl = async (params) => {
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3, command);
  return url;
};

module.exports = {
  s3,
  s3_upload,
  s3_signedUrl,
};
