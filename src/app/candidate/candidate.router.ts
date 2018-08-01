import { NgModule }      from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent} from './registration.component';
import { RegistrationDetails} from './candidate.showRegistration.component';
import { EnrollmentComponent} from './candidate.enrollment.component';
import { PaymentComponent} from './candidate.payment.component';
import { ViewPaymentDetailsComponent} from './candidate.viewPaymentDetails.component';
import { PaymentCancelComponent} from './candidate.paymentCancelComponent';
import { LogOutComponent} from './candidate.logout.component';
import { AnotherPaymentComponent} from './candidate.another.payment.component';
import { PaymentErrorComponent} from './candidate.payment.error.component';
     


const router:Routes=[
        {  path:'',redirectTo:'makePayment',pathMatch:'full'},
        {  path:'makePayment',component: PaymentComponent},
        {  path:'registration',component:RegistrationComponent },
        {  path:'showRegistrationDetails/:id',component: RegistrationDetails},
        {  path:'candidateAnotherPayment/:id',component: AnotherPaymentComponent},
        {  path:'enrollment/:id',component: EnrollmentComponent},
        {  path:'viewpaymentdetails',component: ViewPaymentDetailsComponent},
        {  path:'cancelpayment',component: PaymentCancelComponent},
        {  path:'errorpayment',component: PaymentErrorComponent},
        {  path:'logout',component: LogOutComponent},
];

  @NgModule({
    imports:[RouterModule.forChild(router)],
    exports:[RouterModule]
})


export class CandidateRoutingModule{

}