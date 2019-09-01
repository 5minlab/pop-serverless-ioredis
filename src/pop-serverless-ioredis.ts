import Redis from 'ioredis'

export function makeMockRedis(): Redis.Redis {
  const RedisMock = require('ioredis-mock')
  const mock = new RedisMock()
  return patchRedis(mock)
}

function patchRedis(mock: Redis.Redis) {
  // ioredis-mock에 구현되어있지 않은 함수 우회
  // ioredis-mock을 직접 고쳐도 되는데 일단 간단하게 처리
  // TODO: 나중에 풀리퀘 넣기
  mock.zrevrank = mock.zrevrank ? mock.zrevrank : make_zrevrank(mock)
  mock.zrank = mock.zrank ? mock.zrank : make_zrank(mock)
  return mock
}

function make_zrevrank(mock: Redis.Redis) {
  return async (key: string, member: string): Promise<number | null> => {
    const items: string[] = await mock.zrevrange(key, 0, -1)
    const idx = items.indexOf(member)
    return idx >= 0 ? idx : null
  }
}

function make_zrank(mock: Redis.Redis) {
  return async (key: string, member: string): Promise<number | null> => {
    const items: string[] = await mock.zrange(key, 0, -1)
    const idx = items.indexOf(member)
    return idx >= 0 ? idx : null
  }
}
