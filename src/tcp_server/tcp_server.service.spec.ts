import { Test, TestingModule } from '@nestjs/testing';
import { TcpServerService } from './tcp_server.service';

describe('TcpServerService', () => {
  let service: TcpServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TcpServerService],
    }).compile();

    service = module.get<TcpServerService>(TcpServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
