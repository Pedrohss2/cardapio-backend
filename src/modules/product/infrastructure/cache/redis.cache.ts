import Redis from 'ioredis';
import { CachePort } from '../../application/ports/cache.port';

export class RedisCache implements CachePort {
    private client = new Redis(process.env.REDIS_URL || "");

    async get<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set<T>(key: string, value: T, ttl: number) {
        await this.client.set(
            key,
            JSON.stringify(value),
            'EX',
            ttl,
        );
    }

    async del(key: string) {
        await this.client.del(key);
    }
}
