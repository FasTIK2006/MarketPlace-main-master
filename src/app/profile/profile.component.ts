import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Service } from '../service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../UserDataService';
import { UserData } from '../UserDataService';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
  })
export class ProfileComponent {
  userData: UserData;
  mail: string ='';
  name: string ='';
  surname: string ='';

  phone: string='';
  
  constructor(private route: ActivatedRoute,
     private service: Service,private db: AngularFirestore,
      private authService: AuthService,
       private userDataService: UserDataService){this.userData = this.userDataService.getUserData();}
  
       ngOnInit(): void {
        this.userDataService.getUserData();
        }

}
