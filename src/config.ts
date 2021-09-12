import dotenv from 'dotenv-safe';

dotenv.config();

export default {
  region: process.env.REGION,
}