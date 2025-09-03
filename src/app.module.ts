import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { Email2Module } from './email2/email2.module';

@Module({
  imports: [EmailModule, Email2Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
