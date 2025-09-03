import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    adminLink?: string;

    @IsOptional()
    @IsString()
    additionalInfo?: string;
}
