import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TabMenuModule,MenuItem} from 'primeng/primeng';
import {LoaderService} from './util/loader.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Component({
    selector: 'dashboard',
    templateUrl: 'app/home.html'
})
export class HomeComponent implements OnInit{
    show:boolean;
    
    constructor(private router: Router,private route: ActivatedRoute,private loader:LoaderService) {
        
    }

    ngOnInit(){
            this.show = true;
            this.router.navigate(['/candidate']);    
    }

}