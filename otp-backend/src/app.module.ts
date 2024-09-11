import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DATABASE_URL || '',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'timemanagementsystem',
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false, // Set to false in production environments
      logging: true, // Enable logging if needed,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,

      // entities: ['src/**/*.entity{.ts,.js}'],
      // migrations: ['migrations/*{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
