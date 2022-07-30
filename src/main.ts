import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env);

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESC)
    .setVersion(process.env.SWAGGER_VERSION)
    //.addTag(process.env.SWAGGER_TAG)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_ENDPOINT_PREFIX, app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
