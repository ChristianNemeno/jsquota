import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const port = process.env.APP_PORT ?? 3000;
  await app.listen(port);
}
bootstrap();
