import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../interfaces/user';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FormsModule, FloatLabelModule, PasswordModule, ButtonModule, MessagesModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router
  ){}

  messages:Message[]=[];
  showMessage:boolean=false;
  
  birthDateMoment:any="";

  userLogin:UserLogin={
    email: '',
    password: '',
  }

  ngOnInit(): void {
  }

  login(){
    if (this.userLogin.email=="" || this.userLogin.password=="") {
            this.messages=[{severity:'error', detail:'Nem adtál meg minden adatot!'}];
            this.showMessage=true
          }
          else{
              this.api.login(`users`,this.userLogin).subscribe((res:any)=>{
                if (res.success==false) {
                  this.messages=[{severity:'warn', detail:`${res.message}`}];
                  this.showMessage=true
                  this.router.navigate(['/'])
                }
                else{
                  this.messages=[{severity:'danger', detail:`${res.message}`}];
                  this.showMessage=true
                }
                this.auth.SaveToken(res.user.token)
              })
            }
  }
}