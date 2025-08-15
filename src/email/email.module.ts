import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { GoogleSheetsService } from './google-sheets.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService,GoogleSheetsService],
})
export class EmailModule { }
