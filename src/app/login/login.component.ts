import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDataService } from '../UserDataService';

type UserData = {
name: string;
surname: string;
mail: string;
phone: string;
};

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

password: string = '';
incorrectPassword: boolean = false;
incorrectMail: boolean = false;
name: string="";
surname: string ="";
mail: string = '';
phone: string = '';
entrance = false;

constructor(public authService: AuthService, private router: Router, private db: AngularFirestore,private userDataService: UserDataService,) {}

ngOnInit(): void {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    this.userDataService.setUserData(userData);
    this.authService.login();
    this.router.navigate(['/profile']);
  }
}

login(): void {
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
}
}