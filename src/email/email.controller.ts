import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post()
  async sendContact(@Body() body: EmailDto) {
    if (!body) {
      throw new HttpException('No data received', HttpStatus.BAD_REQUEST);
    }

    await this.emailService.sendContactEmail(body);
    return { message: 'Message envoyé avec succès' };
  }
}
