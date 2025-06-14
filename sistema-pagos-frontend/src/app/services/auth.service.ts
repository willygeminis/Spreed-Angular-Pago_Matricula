import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users: any = {
    admin : {password:'123', roles:['ESTUDIANTE', 'ADMIN']},
    user1: {password:'123', roles:['ESTUDIANTE']}
  };

  public user: any;
  public roles: string[] = [];
  public isAuthenticated: boolean = false;

  constructor(private router: Router) { }

  public login(username: string, password: string): boolean{
    if(this.users[username] && this.users[username].password === password) {
      this.user = username;
      this.roles = this.users[username].roles;
      this.isAuthenticated = true;
      return true;
    }else {
      return false;
    }
  }

  public logout(): void {
    this.user = undefined;
    this.roles = [];
    this.isAuthenticated = false;
    this.router.navigateByUrl('/login');
  }


}
