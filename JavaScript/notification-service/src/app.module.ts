import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true, // production -> false
        }),

        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: +process.env.REDIS_PORT,
            }
        }),
        NotificationModule,
        EmailModule,
        QueueModule,
    ]
})
export class AppModule {}