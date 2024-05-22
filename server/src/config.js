import "./boot.js";
import getNodeEnv from "./config/getNodeEnv.js";
import getDatabaseUrl from "./config/getDatabaseUrl.cjs";

const development = {
  awsAccess: { key: process.env.AWS_ACCESS_KEY },
  awsSecret: { key: process.env.AWS_SECRET_ACCESS_KEY },
  s3Bucket: { name: process.env.S3_BUCKET_DEVELOPMENT },
  email: { address: process.env.EMAIL_ADDRESS, password: process.env.EMAIL_PASSWORD },
  nodeEnv: getNodeEnv(),
  session: { secret: process.env.SESSION_SECRET },
  databaseUrl: getDatabaseUrl(getNodeEnv()),
  web: { host: process.env.HOST || "0.0.0.0", port: process.env.PORT || 3000 },
  defaultProfilePic: "https://allowance-chore-tracker.s3.amazonaws.com/default-profile-pic"
};

const test = { ...development }

const production = {
  ...development,
  s3Bucket: { name: process.env.S3_BUCKET_PRODUCTION }
}

const config = { development, test, production }

export default config[getNodeEnv()]