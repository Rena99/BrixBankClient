export interface EmailVerification {
    firstName: string;
    lastName:string;
    email: string;
    password: string;
    VerificationCode:number;
    ExpirationTime:Date;
}