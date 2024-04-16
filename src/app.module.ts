import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TcpServerService } from './tcp_server/tcp_server.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60, //time window for request in seconds
        limit: 10, // maximum number of request within the time window
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TcpServerService],
})
export class AppModule {
  constructor(private readonly tcpServerService: TcpServerService) {
    this.tcpServerService.startServer();
  }
}
