import { Controller, Get, Post, NotImplementedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('bestpayments')
export class BestpaymentsController {
    @Post('create')
    @ApiOperation({
        description: 'This endpoint will create the payment in bestpayments provider' 
    })
    create(): string {
        throw new NotImplementedException();
    }

    @Post('verify')
    @ApiOperation({
        description: 'This endpoint will verify the payment in bestpayments provider' 
    })
    verify(): string {
        throw new NotImplementedException();
    }

    @Get('callback')
    @ApiOperation({
        description: 'This endpoint will handle the callback from bestpayments provider' 
    })
    callback(): void {
        throw new NotImplementedException();
    }
}
