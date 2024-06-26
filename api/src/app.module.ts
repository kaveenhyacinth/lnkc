import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkModule } from './link/link.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link/link.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { TeamModule } from './team/team.module';
import { Team } from './team/team.entity';
import { VerifyOwnershipMiddleware } from './middlewares/verify-ownership.middleware';
import { LinkController } from './link/link.controller';
import { AnalyticsModule } from './analytics/analytics.module';
import { Analytics } from './analytics/analytics.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'cockroachdb',
        host: config.get<string>('POSTGRES_HOST'),
        port: parseInt(config.get<string>('POSTGRES_PORT')),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DATABASE'),
        entities: [Link, User, Role, Team, Analytics],
        synchronize: false,
        ssl: true,
      }),
    }),
    TypeOrmModule.forFeature([Link, User, Role, Team, Analytics]),
    LinkModule,
    AuthenticationModule,
    UserModule,
    RoleModule,
    TeamModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyOwnershipMiddleware).forRoutes(LinkController);
  }
}
