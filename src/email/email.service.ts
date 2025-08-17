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
        const templateAutoPath = join(process.cwd(), 'src', 'email', 'template', 'auto-email.html');
        //Read the templates
        let htmlContent = await readFile(templatePath, 'utf8');
        let htmlContentAuto = await readFile(templateAutoPath, 'utf8');

        htmlContent = htmlContent
            .replace('{{organisation}}', data.organisation)
            .replace('{{typeOrganisation}}', data.typeOrganisation)
            .replace('{{name}}', data.name)
            .replace('{{email}}', data.email)
            .replace('{{telephone}}', data.telephone)
            .replace('{{typePartnership}}', data.typePartnership);

        htmlContentAuto = htmlContentAuto
            .replace('{{name}}', data.name)

        //Send email
        const emailInfo = await this.transporter.sendMail({
            from: `"Le congo que je veux" <${process.env.SMTP_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: 'Nouvelle demande de partenariat',
            html: htmlContent,
        });

        await this.transporter.sendMail({
            from: `"Le Congo que je veux" <${process.env.SMTP_USER}>`,
            to: data.email,
            subject: 'Confirmation de votre demande de partenariat',
            html: htmlContentAuto,
        });
        await this.sheetsService.appendEmail({ ...data, idMail: emailInfo.messageId });
        return emailInfo;

    }
}
