import { Injectable, UseGuards } from '@nestjs/common';
import { createServer, Socket } from 'net';
import { existsSync, truncate, unlinkSync, writeFile } from 'fs';
import { promisify } from 'util';
import { ThrottlerGuard } from '@nestjs/throttler';
@Injectable()
export class TcpServerService {
  @UseGuards(ThrottlerGuard) //  ThrottlerGuard ensure that the method is rate-limited
  startServer(): void {
    const server = createServer((socket: Socket) => {
      console.log('Client connected');

      socket.on('data', (data) => {
        // console.log('Received data:', data.toString());
        if (data) {
          // Handle received data here
          let arrayData = data.toString().split('\n');
          let device_ID = arrayData[0];
          if (device_ID.slice(0, 9) == 'synlogger') {
            console.log('deviceid', device_ID);
            for (let i = 1; i < arrayData.length - 1; i++) {
              let line = arrayData[i].split(',');
              if (line.length >= 2) {
                let timestamp = line[0];
                this.writeToFile(
                  'data',
                  `${device_ID}-${timestamp}.json`,
                  JSON.stringify(line.slice(1, 5), null, 2),
                );
              } else {
                console.log('values not available');
              }
            }
          } else {
            console.log('Device-ID not available');
          }
        } else {
          console.log('No data available');
        }
      });

      socket.on('end', () => {
        console.log('Client disconnected');
      });
    });

    const port = 8412; // Port number to listen on
    server.listen(port, () => {
      console.log(`TCP server listening on port ${port}`);
    });
  }
  async writeToFile(
    path: string,
    fileName: string,
    data: string,
  ): Promise<void> {
    try {
      const filePath = `${path}/${fileName}`;
      const writeFileAsync = promisify(writeFile);
      if (existsSync(filePath)) {
        await promisify(truncate)(filePath);
      }
      await writeFileAsync(filePath, data, {
        flag: 'w',
        encoding: 'utf8',
      });
    } catch (error) {
      console.log(`Error writing to file ${fileName}: ${error}`);
    }
  }
}
