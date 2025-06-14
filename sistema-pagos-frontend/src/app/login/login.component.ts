import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginFrom !: FormGroup;

  constructor(private formBuilder: FormBuilder,private authservice:AuthService ,private router: Router) { }

  ngOnInit():void{
    this.loginFrom = this.formBuilder.group({
      username:this.formBuilder.control(''),
      password:this.formBuilder.control('')
    });
  }
  login():void{
    let username = this.loginFrom.value.username;
    let password = this.loginFrom.value.password;
    let auth:boolean = this.authservice.login(username, password);

    if(auth==true){
      this.router.navigateByUrl('/admin');
  }
}

}
