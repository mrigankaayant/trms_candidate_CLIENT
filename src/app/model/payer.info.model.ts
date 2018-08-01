import{ShippingAddress} from './shippingAddress.model';
export class PayerInfo{
    email :string;
    firstName : string;
    lastName : string;
    payerId : string;
    countryCode : string;
    shippingAddress : ShippingAddress
}