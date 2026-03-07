
module.exports = Object.freeze({
    PORT: process.env.PORT ?? 3001,
    REDIS_HOST: process.env.REDIS_HOST ?? '0.0.0.0',
    REDIS_PORT: process.env.REDIS_PORT ?? 6379,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? null,
    REDIS_CLUSTER: process.env.REDIS_CLUSTER ? process.env.REDIS_CLUSTER === 'true' : false,
    INIT_DATA_FORCE: process.env.INIT_DATA_FORCE ? process.env.INIT_DATA_FORCE === 'true' : false,
    SMARTPROPERTIES_TENANT: 'smartproperties',
    SUPER_ADMIN: 'super-admin',
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD ?? 'admin',
    ADMIN: 'admin',
    OPERATOR: 'operator',
    TESTER: 'tester'
});