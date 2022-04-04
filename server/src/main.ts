import { ResponseTransformInterceptor } from './shared/interceptors/response-transform.interface';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from "helmet";
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';


import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule);

  //*Security*
  app.enableCors(); // Enabling CORS
  app.use(helmet()); // Common security prevention using Helmet
  app.use(cookieParser()); // Pre-req for using  CSRF protection
  app.use(csurf()); // Prevent Cross-site request forgery attacks

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseTransformInterceptor());



  if (process.env.ENVIRONMENT === 'development') {
  }

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Task')
    .setDescription('Task  API Description')
    .setVersion('1.0')
    .addTag('task')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document, {
    uiConfig: {
      displayOperationId: true,
    },
  });

  await app.listen(8000, '0.0.0.0');

  Logger.log('Server started running on port 8000');
}
bootstrap();

