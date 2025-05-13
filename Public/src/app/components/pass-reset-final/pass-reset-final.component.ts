import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from '../footer/footer.component';
import { updatePassword } from '../../interfaces/user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CodeService } from '../../services/code.service';

@Component({
  selector: 'app-pass-reset-final',
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
    //RouterLink,
    FooterComponent
  ],
  templateUrl: './pass-reset-final.component.html',
  styleUrl: './pass-reset-final.component.scss',
  providers: [MessageService]
})
export class PassResetFinalComponent implements OnInit{
    constructor(
      private api: ApiService,
      private auth: AuthService,
      private router : Router,
      private messageService: MessageService,
      private codeService: CodeService
    ){}

  email: string = '';

  newPasswords:updatePassword={
    password: '',
    confirm: ''
  }

  ngOnInit(): void {
    this.email = this.codeService.getEmail(); 
  }
  
  saveNewPasswd(){
    this.api.reset('users', this.email, this.newPasswords).subscribe({
      next: (res: any) => {
        this.showMessage('success', 'Siker', res.message);

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err: any) => {
        this.showMessage('error', 'Hiba', err.error.message);
      }
    });
  }

  showMessage(tipus:string, cim:string, tartalom:string){
      this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
  }
}