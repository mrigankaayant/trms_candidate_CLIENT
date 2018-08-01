import{Payer} from'./payer.model';
import{Transaction} from'./transaction.model';
import{Link} from'./link.model';
export class Payment{
    payemntId:string;
    intent:string;
    payer:Payer;
    cart:string;
    transactions:Transaction
   
     
}