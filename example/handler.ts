import 'source-map-support/register';
import * as Redis from 'ioredis';
import { APIGatewayProxyHandler } from 'aws-lambda';
// import { makeMockRedis } from 'pop-serverless-ioredis';

const endpoint = process.env.REDIS_ENDPOINT || '';
const password = process.env.REDIS_PASSWORD || '';
const url = `redis://:${password}@${endpoint}`;

const prefix = 'pop-serverless-ioredis'
const key = `${prefix}:now`;

export const real: APIGatewayProxyHandler = async (event, _context) => {
  const redis = new Redis(url);
  const result = await redis.set(key, Date.now());

  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
      input: event,
    }, null, 2),
  };
}


export const mock: APIGatewayProxyHandler = async (event, _context) => {
  // TODO: fix
  const redis = new Redis(url);
  const result = await redis.set(key, Date.now());

  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
      input: event,
    }, null, 2),
  };
}
