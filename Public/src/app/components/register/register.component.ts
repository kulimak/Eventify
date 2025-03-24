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
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { UserRegister } from '../../interfaces/user';
import { isNgTemplate } from '@angular/compiler';
import moment from 'moment';
import { MessagesModule } from 'primeng/messages';
import { Message, MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';



interface Category {
  name: string,
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    RadioButtonModule, 
    MultiSelectModule,
    CalendarModule,
    MessagesModule,
    ToastModule,
    RippleModule 
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})

export class RegisterComponent {

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService
  ){}

  /*messages:Message[]=[];
  showMessage:boolean=false;*/
  
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
        this.showMessage('error','Hiba','Nem adtál meg minden adatot!');
      }
      else{
        if (this.userReg.password!=this.userReg.confirm) {
          this.showMessage('error','Hiba','A jelszavak nem egyeznek!')
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
              this.router.navigate(['/login']);
            }
            else{
              this.showMessage('error','Hiba','Hiba a regisztráció srorán!')
            }
          });
        }
      }
    }

    showMessage(tipus:string, cim:string, tartalom:string){
      this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
    }
}
