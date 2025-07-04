import * as dotenv from "dotenv";

dotenv.config();

type EnvEntry<T = unknown> = {
    key: string;
    handler?: (envVal: string) => T;
    default?: T;
};

type InferEnvValues<E extends readonly EnvEntry[]> = {
    [K in keyof E]: E[K] extends EnvEntry<infer T> ? T : never;
};

type EnvKeyTuple<E extends readonly EnvEntry[]> = {
    [K in keyof E]: E[K] extends EnvEntry<any> ? E[K]["key"] : never;
};

export class EnvManager<T extends Record<string, unknown> = {}> {
    private envValues: T;

    constructor(envValues: T) {
        this.envValues = envValues;

        for (const key in envValues) {
            // @ts-ignore
            this[key] = envValues[key];
        }
    }

    static new<E extends readonly EnvEntry[]>(entries: E): EnvManager<
        {
            [K in E[number] as K["key"]]: K extends EnvEntry<infer V> ? V : string;
        }
    > {
        const envValues: Record<string, unknown> = {};

        for (const entry of entries) {
            const raw = process.env[entry.key];

            if (raw !== undefined) {
                envValues[entry.key] = entry.handler ? entry.handler(raw) : raw;
            }
            else if (entry.default !== undefined) {
                envValues[entry.key] = entry.default;
            }
            else {
                throw new Error(`Missing environment variable: ${entry.key}`);
            }
        }

        return new EnvManager(envValues);
    }

    get<K extends keyof T>(key: K): T[K] {
        return this.envValues[key];
    }

    getAll(): T {
        return this.envValues;
    }
}
