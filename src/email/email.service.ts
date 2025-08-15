import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { EmailDto } from './dto/email.dto';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { GoogleSheetsService } from './google-sheets.service';

@Injectable()
export class EmailService {
    private transporter;

    constructor(private readonly sheetsService: GoogleSheetsService) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendContactEmail(data: EmailDto) {
        const templatePath = join(process.cwd(), 'src', 'email', 'template', 'contact-email.html');
        //Read the template
        let htmlContent = await readFile(templatePath, 'utf8');
        htmlContent = htmlContent
            .replace('{{organisation}}', data.organisation)
            .replace('{{typeOrganisation}}', data.typeOrganisation)
            .replace('{{name}}', data.name)
            .replace('{{email}}', data.email)
            .replace('{{telephone}}', data.telephone)
            .replace('{{typePartnership}}', data.typePartnership);
        const emailInfo = await this.transporter.sendMail({
            from: `"Le congo que je veux" <${process.env.SMTP_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: 'Nouvelle demande de partenariat',
            html: htmlContent,
        });
        await this.sheetsService.appendEmail({ ...data, idMail: emailInfo.messageId });

        return emailInfo;

    }
}
