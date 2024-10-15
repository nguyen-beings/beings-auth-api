import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    private users = [
        { id: 1, username: 'test', password: bcrypt.hashSync('password', 10) },
    ]

    async findOne(username: string): Promise<any> {
        return this.users.find(user => user.username === username)
    }

    async validatePassword(user: any, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password)
    }
}
