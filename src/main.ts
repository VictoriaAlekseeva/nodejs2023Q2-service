import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { parse } from 'yamljs';
import { readFile } from 'fs/promises';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = async () => {
    const yamlPath = resolve(__dirname, '../doc/api.yaml');
    const yamlContents = await readFile(yamlPath, 'utf-8');
    return parse(yamlContents);
  };

  const setupSwagger = async (app:  INestApplication) => {
    const config = await swaggerConfig();
    SwaggerModule.setup('doc', app, config);
  };

  await setupSwagger(app)


  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
