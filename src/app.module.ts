import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './api/auth/auth.module'
import { UsersModule } from './api/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from 'nestjs-redis'
import { GuardModule } from './guard/guard.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes the config available globally
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            autoLoadEntities: true,
            synchronize: true, // Don't use `synchronize: true` in production, as it may lead to data loss.
        }),
        // RedisModule.register({
        //   useFactory: (configService: ConfigService) => configService.get('redis'),         // or use async method
        //         //useFactory: async (configService: ConfigService) => configService.get('redis'),
        //   inject:[ConfigService]
        //   // host: process.env.REDIS_HOST,
        //   // port: parseInt(process.env.REDIS_PORT, 10),
        //   // password: process.env.REDIS_PASSWORD,
        // }),
        AuthModule,
        UsersModule,
        GuardModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
