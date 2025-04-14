import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../interfaces/user';
import { MessagesModule } from 'primeng/messages';
import { Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule, 
    FormsModule, 
    FloatLabelModule,
    PasswordModule,
    ButtonModule, 
    MessagesModule,
    ToastModule,
    RippleModule,
    CheckboxModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit{

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService
  ){}
  
  birthDateMoment:any="";
  checked:boolean=false;

  userLogin:UserLogin={
    email: '',
    password: '',
  }

  ngOnInit(): void {
  }

  login(){
    if (this.checked) {
      this.api.companyLogin(`company`, this.userLogin).subscribe({
        next: (res: any) => {
            this.showMessage('success', 'Siker', res.message);
            this.auth.SaveToken(res.company.token);
            this.router.navigate(['/fooldal']);
        },
        error: (err: any) => {
            this.showMessage('error', 'Hiba', err.error.message || 'Hibás email cím vagy jelszó!');
        }
    });
    }
    else{
    this.api.login(`users`, this.userLogin).subscribe({
      next: (res: any) => {
          this.showMessage('success', 'Siker', res.message);
          this.auth.SaveToken(res.user.token);
          this.router.navigate(['/fooldal']);
      },
      error: (err: any) => {
          this.showMessage('error', 'Hiba', err.error.message || 'Hibás email cím vagy jelszó!');
      }
  });
  }
}

  showMessage(tipus:string, cim:string, tartalom:string){
    this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
  }
}