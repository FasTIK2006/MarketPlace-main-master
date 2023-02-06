import { Component, } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
  })
export class ProfileComponent {
  name: string = '';
  surname: string = '';
  mail: string = '';
  phone: string='';
  constructor(private db: AngularFirestore, private authService: AuthService) {}
  // ngOnInit() {
  //   this.authService.user$.subscribe((user) => {
  //   if (user) {
  //   this.db
  //   .collection("Users")
  //   .doc(user.uid)
  //   .valueChanges()
  //   .subscribe((userData) => {
  //   this.name = userData["name"];
  //   this.surname = userData["surname"];
  //   this.mail = userData["email"];
  //   this.phone = userData["phone"];
  //   });
  //   }
  //   });
  //   }
     }
