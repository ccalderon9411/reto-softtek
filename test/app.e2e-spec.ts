import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';

jest.setTimeout(80000);
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('(GET) /', async () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('(GET) /health/liveness', async () => {
    return request(app.getHttpServer()).get('/health/liveness').expect(200).expect({
      status: 'up',
    });
  });

  it('(GET) /health/readiness', async () => {
    return request(app.getHttpServer()).get('/health/readiness').expect(200);
  });
});
