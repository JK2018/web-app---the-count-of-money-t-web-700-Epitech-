import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  // Init Swagger
  const options = new DocumentBuilder()
      .setTitle('T-WEB')
      .setDescription('T-WEB Project Api Doc')
      .setVersion('1.0')
      .addTag('WEB')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
