import {RelatedReources} from'./related.resources.model';
import{Amount} from './amount.model';
import{Payee} from './payee.model';
import{ItemList} from './itemList.model';
export class Transaction{
                relatedResources : RelatedReources[]; 
                amount : Amount;
                payee : Payee;
                itemList : ItemList; 
                
}