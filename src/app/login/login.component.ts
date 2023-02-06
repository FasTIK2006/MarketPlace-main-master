import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router'
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  mail: string = '';
  password: string = '';
  incorrectPassword: boolean = false;
  incorrectMail: boolean = false;
  entrance = false;
  constructor(public authService: AuthService, private router: Router, private db: AngularFirestore) {}
    
  

  ngOnInit(): void { }
  login(): void {
    this.db
    .collection("Users")
    .ref.where("mail", "==", this.mail)
    .where("password", "==", this.password)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 1) {
        this.authService.login();
        this.router.navigate(["/"]);
        console.log('All OK')
      } else {
        console.log("Incorrect data");
      }
    })
    .catch((error) => {
      console.error("Error logging in: ", error);
    });
  }
}