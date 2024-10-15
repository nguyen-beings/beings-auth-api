import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dto/user.dto'

type UserResponse = Omit<UserDto, 'password'>

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        if (
            user &&
            (await this.usersService.validatePassword(user, password))
        ) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    // Sign a JWT token for the user
    async login(user: UserResponse): Promise<String> {
        const payload = { username: user.username, sub: user.id }
        return this.jwtService.sign(payload)
    }
}
