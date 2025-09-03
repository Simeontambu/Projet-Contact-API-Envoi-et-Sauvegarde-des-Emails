import { Test, TestingModule } from '@nestjs/testing';
import { Email2Controller } from './email2.controller';
import { Email2Service } from './email2.service';

describe('Email2Controller', () => {
  let controller: Email2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Email2Controller],
      providers: [Email2Service],
    }).compile();

    controller = module.get<Email2Controller>(Email2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
