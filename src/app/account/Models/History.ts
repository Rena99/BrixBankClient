export interface History {
    transactionAmount: number;
    balance:number;
    operationTime: Date;
    accountId: string;
    debit: boolean;
    transactionId:string;
    succeeded: boolean;
}
