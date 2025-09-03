import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Email2Service } from './email2.service';
import { SendUserDto } from './dto/sendMail.dto';

@Controller('email2')
export class Email2Controller {
  constructor(private readonly email2Service: Email2Service) { }

  @Post()
  async sendMail(@Body() body: SendUserDto) {
    if (!body) {
      throw new HttpException('No data received', HttpStatus.BAD_REQUEST);
    }

    await this.email2Service.sendEmail(body);
    return { message: 'Message envoyé avec succès' };
  }
}
