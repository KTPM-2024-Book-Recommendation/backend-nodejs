import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as useCases from './application';
import * as services from './services';
import * as strategies from './strategies';
import { DatabaseModule } from 'src/database';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from '../mail';
import { CacheModule } from '@nestjs/cache-manager';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

const Services = [...Object.values(services)];
const Strategies = [...Object.values(strategies)];

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.register({signOptions: {algorithm: 'HS256'}}),
    MailModule,
    CacheModule.register({ isGlobal: true })
  ],
  controllers: [...endpoints],
  providers: [...Services, ...handlers, ...Strategies],
  exports: [...Services, ...handlers, ...Strategies],
})
export class AuthModule {}
