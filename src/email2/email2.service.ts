import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { SendUserDto } from './dto/sendMail.dto';

@Injectable()
export class Email2Service {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER_2,
                pass: process.env.SMTP_PASS_2,
            },
        });
    }

    async sendEmail(data: SendUserDto) {
        const emailContent = `
            Bonjour ${data.name} ${data.firstName},

            Votre compte a été créé avec succès.

            Vos informations de connexion :
            - Email : ${data.email}
            - Mot de passe : ${data.password}
            - Rôle : ${data.role}

            Vous pouvez accéder ici pour founir d'autres informations : ${data.adminLink || 'Lien non fourni'}

            Cordialement,
            RNUML
            `;

        const emailInfo = await this.transporter.sendMail({
            from: `"Le RNUML" <${process.env.SMTP_USER_2}>`,
            to: data.email,
            subject: 'Nouvelle demande de partenariat',
            text: emailContent,
        });
        return emailInfo;

    }
}
