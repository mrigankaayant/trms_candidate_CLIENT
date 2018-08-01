 import{Amount} from './amount.model'
 import{TransactionFee} from './transaction.fee.model'
 import{Link} from './link.model'
 export class Sale{
     amount :Amount; 
     paymentMode : string;
     state : string
     protectionEligibility : string;
     protectionEligibilityType : string;
     transactionFee:TransactionFee;
     receiptId : string;
     parentPayment : string;
     createTime : string;
     updateTime : string;
 }