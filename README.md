<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is simple REST API to handle the payment and we implement by using [Nest](https://github.com/nestjs/nest) framework. Right now we just implemented for bestpayments provider

## Installation

```bash
$ npm install

# Copy the env and edit to adapt with your environment
$ cp .env.copy .env
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swager OPEN API
You can go to Swagger API documentation with the link of format APP_HOST:APP_PORT/SWAGGER_. Example: http://localhost:3000/api

## TODO

1. Need to use database for payment
2. Need to add more tables for verifying more side effects like checking validity of payment provider or client exists or not
3. Add test, right now the API is just fake, hard to test

## Improvement
There is some thing in API need to improve

1. Based on the spec, when client come back from BestPayment app, it will make POST request to R API with this payload:

```
itemId(string: UUID)
clientId(string: UUID)
status(enum: ['accepted', 'declined', 'error'] | optional)
```

There are 2 problems with this payload. The first one is itemId and clientId is not a unique composite key to find the payment. There will be case that
same client make payment for same item so in system there will be duplicate error. I suggest to change the payload like this:

```
paymentReference(string: UUID) This can be external_id or identifier from our own database. Based on this we can retreived the payment in R API
```
The payment reference is enough, we should not allow client post status and the R API should not trust the client, R API need to verify or get payment's status from provider

2. 

## Stay in touch

- Author - [Phong Ly](lyquocphong@gmail.com)

## License

Nest is [MIT licensed](LICENSE).
