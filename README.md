# Projet Contact API – Envoi et Sauvegarde des Emails

## Description

Cette application est une **API NestJS** qui permet :

1. **D’envoyer des emails** à partir d’un formulaire frontend (React ou autre).
2. **De sauvegarder les informations du formulaire** dans un **Google Sheet** via l’API Google Sheets.

Le projet utilise :

* **NestJS** pour le backend.
* **Nodemailer** pour l’envoi d’emails via SMTP.
* **Google Sheets API** pour sauvegarder les données.
* **dotenv** pour la configuration des variables d’environnement.

---

## Fonctionnalités

* Recevoir les données d’un formulaire : nom, email, téléphone, organisation, type de partenariat, message.
* Envoyer un email au destinataire configuré (`RECEIVER_EMAIL`).
* Sauvegarder les données dans un Google Sheet pour suivi.
* Prêt pour le déploiement sur **Render** ou tout autre hébergeur Node.js.

---

## Prérequis

* Node.js v18+
* Compte Gmail (ou autre service SMTP)
* Compte Google Cloud avec accès à Google Sheets API
* NestJS CLI installé :

```bash
npm install -g @nestjs/cli
```

---

## Installation

1. Cloner le projet :

```bash
git clone https://github.com/ton-username/contact-api.git
cd contact-api
```

2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` à la racine du projet :

```env
# SMTP (pour envoyer les emails)
SMTP_USER=monemail@gmail.com
SMTP_PASS=mot_de_passe_app
RECEIVER_EMAIL=destinataire@gmail.com

# Google Sheets
GOOGLE_PROJECT_ID=ton_project_id
GOOGLE_CLIENT_EMAIL=ton_email_service_account
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=ton_google_sheet_id

# Port
PORT=3000
```

> 🔹 Pour Gmail : créer un **App Password** si l’authentification à deux facteurs est activée.
> 🔹 Pour Google Sheets : créer un **service account** dans Google Cloud Console et partager ton Google Sheet avec son email.

---

## Configuration Google Sheets

1. Créer un **Google Cloud Project**.
2. Activer l’**API Google Sheets**.
3. Créer un **Service Account** et télécharger la clé JSON.
4. Partager le Google Sheet avec le service account (lecture/écriture).
5. Copier les informations nécessaires dans le `.env`.

---

## Lancer le projet

```bash
npm run start:dev
```

* L’API sera disponible sur : `http://localhost:3000`
* Le formulaire frontend pourra envoyer les données via `POST /contact`

---

## Exemple de requête (POST /contact)

```json
POST /contact
Content-Type: application/json

{
  "organization": "Mon ONG",
  "organizationType": "ONG",
  "contactName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+243 XXX XXX XXX",
  "partnershipType": "Collaboration sur projet X"
}
```

* L’API enverra un email à `RECEIVER_EMAIL` et sauvegardera les données dans le Google Sheet configuré.

---

## Technologies utilisées

* NestJS
* Nodemailer
* Google Sheets API
* dotenv
* TypeScript

---

## Notes

* Assurez-vous que **CORS** est activé si votre frontend est sur un domaine différent :

```ts
app.enableCors({ origin: "https://votre-frontend.com" });
```

* Les emails et les données du formulaire sont stockés de manière sécurisée grâce aux variables d’environnement.

