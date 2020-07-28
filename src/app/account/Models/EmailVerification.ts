export interface EmailVerification {
    firstName: string;
    lastName:string;
    email: string;
    password: string;
    verificationCode:number;
    expirationTime:Date;
}