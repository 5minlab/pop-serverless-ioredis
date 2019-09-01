import { makeMockRedis } from '../src/pop-serverless-ioredis'

describe('makeMockRedis', () => {
  it('get/set', async () => {
    const redis = makeMockRedis()

    const key = 'foo'
    const val = 'bar'
    await redis.set(key, val)
    expect(await redis.get(key)).toBe(val)
  })

  // https://redis.io/commands/zrank
  it('zrank', async () => {
    const redis = makeMockRedis()

    await redis.zadd('myzset', '1', 'one')
    await redis.zadd('myzset', '2', 'two')
    await redis.zadd('myzset', '3', 'three')

    expect(await redis.zrank('myzset', 'three')).toBe(2)
    expect(await redis.zrank('myzset', 'four')).toBeNull()
  })

  // https://redis.io/commands/zrevrank
  it('zrevrank', async () => {
    const redis = makeMockRedis()

    await redis.zadd('myzset', '1', 'one')
    await redis.zadd('myzset', '2', 'two')
    await redis.zadd('myzset', '3', 'three')

    expect(await redis.zrevrank('myzset', 'one')).toBe(2)
    expect(await redis.zrevrank('myzset', 'four')).toBeNull()
  })
})
