import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheManagerService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public getCache = async <T>(key: string) => {
    return await this.cacheManager.get<T>(key);
  };

  public setCache = async (key: string, data: any, ttl: number) => {
    await this.cacheManager.set(key, data, ttl);
  };

  deleteCache = async (key: string) => {
    return await this.cacheManager.del(key);
  };
}
