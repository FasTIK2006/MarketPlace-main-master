import { Injectable } from '@angular/core';

export interface UserData {
name: string;
surname: string;
mail: string;
phone: string;
}

@Injectable({
providedIn: 'root'
})
export class UserDataService {
private userData: UserData = {
name: '',
surname: '',
mail: '',
phone: '',
};

constructor() {
const storedData = localStorage.getItem('userData');
if (storedData) {
this.userData = JSON.parse(storedData);
}
}

setUserData(data: UserData) {
this.userData = {
name: data.name,
surname: data.surname,
mail: data.mail,
phone: data.phone,
};
localStorage.setItem('userData', JSON.stringify(this.userData));
}

getUserData(): UserData {
return this.userData;
}
}