import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

/**
 * swagger setup
 */

const config = new DocumentBuilder().setVersion('1.0')
.setTitle('NestJS Intro API')
.setDescription('The NestJS Intro API description')
.setTermsOfService('http://example.com/terms')
.setLicense('MIT', 'https://opensource.org/licenses/MIT')
.addServer('http://localhost:3000')
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

await app.listen(process.env.PORT ?? 3000);
}


bootstrap();
