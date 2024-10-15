export interface EnvConf {
    // Server configuration
    NODE_ENV: string
    SERVER_PORT: number
    SERVER_DOMAIN: string

    // PostgreSQL database connection
    DB_HOST: string
    DB_PORT: number
    DB_USERNAME: string
    DB_PASSWORD: string
    DB_DATABASE: string

    // Redis configuration
    REDIS_HOST: string
    REDIS_PORT: number
    REDIS_PASSWORD: string

    // JWT Key Paths
    JWT_PRIVATE_KEY_PATH: string
    JWT_PUBLIC_KEY_PATH: string
}
