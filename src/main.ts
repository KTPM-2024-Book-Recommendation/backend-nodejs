import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { json, urlencoded } from "express";
import * as compression from "compression";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "dotenv";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";
import { PrismaService } from "./database";
import { InteractionType } from "@prisma/client";

config();
const port = process.env.port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const cookieSecret = configService.get<string>("COOKIE_SECRET");

  app.use(helmet());
  app.use(compression());
  app.use(json({ limit: "2mb" }));
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser(cookieSecret));
  app.enableCors();
  app.enableVersioning();

  app.useGlobalFilters();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Book Recommendation System")
    .setDescription("API document")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(port);

  const url = await app.getUrl();
  console.log(`Let's come to api document: ${url}/swagger`);

  setInterval(() => checkDailyNewInteractions(app), 24 * 60 * 60 * 1000); // 24 hours in milliseconds
}

async function checkDailyNewInteractions (app: INestApplication<any>) {
  {
    const dbContext = app.get(PrismaService);

    const numberOfNewInteractions = await dbContext.interaction.count({
      where: {
        trained: false,
        type: InteractionType.RATING,
      },
    });

    if (numberOfNewInteractions >= 500) {
      const mailerService = app.get(MailerService);
      await mailerService.sendMail({
        to: 'phuoc.dut.udn@gmail.com',
        from: process.env.EMAIL_SUPPORTER,
        subject: "Action Required: Retrain Collaborative Model",
        template: "../templates/retrainCollaborativeModel.hbs",
        context: {
          numberOfNewInteractions,
        },
      });
    }
  }
}

bootstrap()
  .then(() => {
    console.log(`Server is listening on port ${port}`);
  })
  .catch((err) => {
    console.log(`Error starting server, ${err}`);
    throw err;
  });
