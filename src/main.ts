import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { EnvConf } from './config/env.config'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService<EnvConf, true>)
    const SERVER_PORT = configService.get('SERVER_PORT', { infer: true })

    // Enable CORS for specific origins
    const SERVER_DOMAIN = configService.get('SERVER_DOMAIN', { infer: true })
    const nodeEnv = configService.get('NODE_ENV', { infer: true })

    const allowedOrigins = [
        SERVER_DOMAIN,
        ...(nodeEnv === 'development' ? ['localhost'] : []),
    ].map(
        // Regex: ^.*\.domain\.com(:\d+)?$
        domain => new RegExp(`^.*${domain.replace(/\./g, '\\.')}(:\\d+)?$`),
    )
    const corsOptions: CorsOptions = {
        origin: allowedOrigins,
        credentials: true,
        allowedHeaders: [
            'Accept',
            'Authorization',
            'Content-Type',
            'If-None-Match',
        ],
    }
    app.enableCors(corsOptions)
    await app.listen(SERVER_PORT, () => {
        console.log(`Server is running on ${SERVER_DOMAIN}:${SERVER_PORT}`)
    })
}
bootstrap()
