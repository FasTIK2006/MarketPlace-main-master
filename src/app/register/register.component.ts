import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  surname: string = '';
  mail: string = '';
  phone: string = '';
  password: string = '';
  password1: string = '';
  incorrectPassword: boolean = false;

  constructor(public authService: AuthService, private router: Router, private db: AngularFirestore) { }

  ngOnInit(): void {
  }
  register(): void {
    if (!this.mail.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
      console.log("email not valid");
      return;
    }

    if (this.password !== this.password1) {
      this.incorrectPassword = true;
      console.log('Password does not match');
      return;
    } else {
      this.incorrectPassword = false;
      console.log('Password match');
    }

    let user = {
      name: this.name,
      surname: this.surname,
      mail: this.mail,
      password: this.password,
      phone: this.phone
    };

    this.db.collection("Users").add(user)
      .then(() => {
        console.log("User added to Firestore successfully");
      })
      .catch((error) => {
        console.error("Error adding user to Firestore: ", error);
      });

    console.log("I saved");
    this.authService.login();
    this.router.navigate(['/']);
    
  }

}




