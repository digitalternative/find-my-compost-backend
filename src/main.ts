import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import bodyParser from 'body-parser';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync(
    __dirname + '/secrets/vps.digitalternative.be/fullchain.pem',
  ),
  cert: fs.readFileSync(
    __dirname + '/secrets/vps.digitalternative.be/privkey.pem',
  ),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    cors: {
      origin: true,
      credentials: true,
    },
  });
  app.use(bodyParser.json({ limit: '3mb' }));
  app.use(bodyParser.urlencoded({ limit: '3mb', extended: true }));
  app.use(
    session({
      secret: '1aa39aea352b1178e314c44c6cbc8b91ade24cd1',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
