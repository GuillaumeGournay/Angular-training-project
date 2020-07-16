import { SafeUrl } from '@angular/platform-browser';

export class UserModel {
    id?: number = 0;
    lastname: string = '';
    firstname: string = '';
    birthdate: Date = new Date();
    profilePic: SafeUrl;
    email: string = '';
    password: string = '';
    isAdmin: boolean = false;
    genderId: number;
    cityId: number;
    testimonyId: number;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}