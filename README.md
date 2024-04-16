## Synlogger
This repository contains a server implementation in NestJS that speaks the SynLogger protocol. The server listens on TCP port 8412 and writes received samples as JSON files into the data directory.

## Security Considerations
- Input Validation: The server validates incoming data to ensure it adheres to the SynLogger protocol format. Any malformed or unexpected data is rejected.
- Rate limiting: It restricts the number of requests a client can make within a certain time frame. This helps prevent abuse, such as denial-of-service (DoS) attacks or excessive resource consumption by a single client.
- Network Security: It will control the IP addresses that are allowed to connect to this server.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```




