import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "src/database";
import * as useCases from "./application";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { ValidationService } from "../services/validation.service";

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith("Endpoint"));
const handlers = applications.filter((x) => x.name.endsWith("Handler"));

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    JwtModule.register({ signOptions: { algorithm: "HS256" } }),
    ConfigModule.forRoot(),
  ],
  controllers: [...endpoints],
  providers: [...handlers, ValidationService],
  exports: [...handlers],
})
export class InteractionModule {}
