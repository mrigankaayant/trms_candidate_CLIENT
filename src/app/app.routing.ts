import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home.componet';
import { AuthGuard } from './auth/auth.guard.service';


const router: Routes = [ 
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'candidate', loadChildren: 'app/candidate/candidate.module#CandidateModule', canActivate: [AuthGuard]},
    

];

@NgModule({
    imports: [RouterModule.forRoot(router)],
    providers:[AuthGuard],
    exports: [RouterModule]
})

export class AppRoutingModule { }                   