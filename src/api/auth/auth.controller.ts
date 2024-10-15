import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from '../../guard/local-auth.guard'
import * as cookieParser from 'cookie-parser'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response() res) {
        const access_token = await this.authService.login(req.user)
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: true,
        })
        return res.send({
            message: 'Logged in successfully',
            user: req.user,
            access_token,
        })
        /* const encryptedToken = this.authService.encryptData(req.user.username);
     
        res.cookie('auth_token', encryptedToken, {
          httpOnly: true,
          secure: true,
        });
     
        return res.send({
          message: 'Logged in successfully',
          user: req.user,
        }); */
    }

    @Post('logout')
    logout(@Response() res) {
        res.clearCookie('auth_token')
        return res.send({ message: 'Logged out successfully' })
    }
}
