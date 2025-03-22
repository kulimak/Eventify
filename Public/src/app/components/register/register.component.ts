import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';  
import {  MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../interfaces/user';
import { isNgTemplate } from '@angular/compiler';
import moment from 'moment';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { formatDate } from '@angular/common';



interface Category {
  name: string,
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, FormsModule, FloatLabelModule, PasswordModule, ButtonModule , RadioButtonModule,  MultiSelectModule, CalendarModule, MessagesModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router
  ){}

  messages:Message[]=[];
  showMessage:boolean=false;
  
  birthDateMoment:any="";

  userReg:UserRegister={
    username: '',
    email: '',
    password: '',
    confirm: '',
    gender: '[tesztadat]',
    defAddress: '',
    favCategories: '',
    birthDate: '',
    image: '',
    role: 'user',
    status: 'active',
  }

  cities!: Category[];

    selectedCategories!: Category[];

    ngOnInit() {
        this.cities = [
            {name: 'New York'},
            {name: 'Rome'},
            {name: 'London'},
            {name: 'Istanbul'},
            {name: 'Paris'}
        ];
    }
    register(){
      if (this.userReg.email=="" || this.userReg.username=="" || this.userReg.password=="" || this.userReg.confirm=="" || this.birthDateMoment=="") {
        this.messages=[{severity:'error', detail:'Nem adtál meg minden adatot!'}];
        this.showMessage=true
      }
      else{
        if (this.userReg.password!=this.userReg.confirm) {
          this.messages=[{severity:'error', detail:'A megadtott jelszavak nem egyeznek!'}];
          this.showMessage=true
        }
        else{
          try {
            this.selectedCategories.forEach(item=>{
              this.userReg.favCategories+=` ${item.name},`;
            });
          } catch (error){}
          this.birthDateMoment = moment(this.birthDateMoment).format('YYYY-MM-DD');
          this.userReg.birthDate=this.birthDateMoment

          this.api.register(`users`,this.userReg).subscribe((res:any)=>{
            if (res.success==true) {
              this.messages=[{severity:'success', detail:'Sikeres regisztráció!'}];
              this.showMessage=true
              this.router.navigate(['/login']);
            }
            else{
              this.messages=[{severity:'danger', detail:'Hiba a regisztráció során!'}];
              this.showMessage=true
            }
            this.auth.SaveToken(res.user.token)
          })
        }
      }
    }
}
