import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDataService } from '../UserDataService';

type UserData = {
  name: string;
  surname: string;
  mail: string;
  phone: string;
  };


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

  constructor(public authService: AuthService, private router: Router, private db: AngularFirestore,private userDataService: UserDataService ) { }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.userDataService.setUserData(userData);
      this.authService.login();
      this.router.navigate(['/profile']);
    }
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
      .then(docRef => {
        console.log("User added to Firestore successfully", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding user to Firestore: ", error);
      });
      this.db
.collection('Users')
.ref.where('mail', '==', this.mail)
.where('password', '==', this.password)
.get()
.then((querySnapshot) => {
if (querySnapshot.size === 1) {
querySnapshot.forEach(doc => {
let userData = doc.data();
const UserData: {
name: string;
surname: string;
mail: string;
phone: string;
} = doc.data() as UserData;
this.userDataService.setUserData({
mail: this.mail,
name: this.name,
surname: this.surname,
phone: this.phone });
localStorage.setItem('userData', JSON.stringify(userData));
})
this.authService.login();
this.router.navigate(['/profile']);
location.reload()
console.log('All OK');
} else {
console.log('Incorrect data');
}
})
.catch((error) => {
console.error('Error logging in: ', error);
});
    console.log("I saved");
    this.router.navigate(['/']);
    
  }

}




