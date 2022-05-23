import * as dotenv from 'dotenv';
import { env } from './utils/Utils.tools';

/**
 * CONFIGURANDO VARIÁVEIS DE AMBIENTE.
 */
dotenv.config({ path: ".env" });
let env_select = env('ENV_SELECT');
console.log("[ INFO ] ENV SELECIONADO > ", env_select);

if (env_select == env('ENV_PROD')) {
  console.log("[ INFO ] ENV FILE CARREGADO > ", env('ENV_PROD_FILE'));
  dotenv.config({ path: env('ENV_PROD_FILE') });
}
else if (env_select == env('ENV_DEV')) {
  console.log("[ INFO ] ENV FILE CARREGADO > ", env('ENV_DEV_FILE'));
  dotenv.config({ path: env('ENV_DEV_FILE') });
}

console.log("[ INFO ] DB SELECIONADO > ", env('DB_SELECTION'));







/**
 * BOOTSTRAP NESTJS
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  await app.listen(3000);
}
bootstrap();
