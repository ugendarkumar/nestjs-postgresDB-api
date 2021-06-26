import { ConfigService } from '@nestjs/config';


export const generatePgConnectionConfig = () => {
    const configService = new ConfigService();
    // Get DB configurations
    return {
        host: configService.get<string>('DB_HOST'),
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        port: configService.get<number>('PORT'),
    };
};
