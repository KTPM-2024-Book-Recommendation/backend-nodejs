import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "src/database";
import * as useCases from "./application";
import { JwtModule } from "@nestjs/jwt";
import * as services from './services';
import { ConfigModule } from "@nestjs/config";

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith("Endpoint"));
const handlers = applications.filter((x) => x.name.endsWith("Handler"));
const Services = [...Object.values(services)];

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    JwtModule.register({ signOptions: { algorithm: "HS256" } }),
    ConfigModule.forRoot(),
  ],
  controllers: [...endpoints],
  providers: [...Services, ...handlers],
  exports: [...Services,...handlers],
})
export class DashboardModule {}
