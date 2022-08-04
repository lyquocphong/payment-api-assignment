import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * This function will show the hello html string
   *
   * @returns string
   */
  @Get()
  hello(): string {
    return `<h1>Welcome to Simple Payment REST API</h1> Read documentation <a href="./${process.env.SWAGGER_ENDPOINT_PREFIX}">here</a>`;
  }
}
