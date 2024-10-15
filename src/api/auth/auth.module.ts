import * as fs from 'node:fs'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LocalStrategy } from '../../guard/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { UsersService } from '../users/users.service'

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async () => {
                return {
                    privateKey: fs.readFileSync(
                        process.env.JWT_PRIVATE_KEY_PATH,
                    ),
                    publicKey: fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH),
                    signOptions: {
                        algorithm: 'RS256',
                        expiresIn: '1h',
                    },
                }
            },
        }),
        UsersModule,
    ],
    providers: [AuthService, LocalStrategy, UsersService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
