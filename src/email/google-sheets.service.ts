import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class GoogleSheetsService {
    private sheets;
    private spreadsheetId = process.env.SPREADSHEET_ID;

    constructor() {
        const auth = new google.auth.GoogleAuth({
            keyFile: join(process.cwd(), 'src/config/service-account.json'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        this.sheets = google.sheets({ version: 'v4', auth });
    }

    async appendEmail(data: any) {
        const values = [
            [
                new Date().toISOString(),
                data.organisation,
                data.typeOrganisation,
                data.name,
                data.email,
                data.telephone,
                data.typePartnership,
                data.idMail || '',
            ],
        ];

        await this.sheets.spreadsheets.values.append({
            spreadsheetId: this.spreadsheetId,
            range: 'Liste des e-mails reçus',
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            requestBody: { values },
        });
    }
}
