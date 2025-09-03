import { Test, TestingModule } from '@nestjs/testing';
import { Email2Service } from './email2.service';

describe('Email2Service', () => {
  let service: Email2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Email2Service],
    }).compile();

    service = module.get<Email2Service>(Email2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
