import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink,  } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from '../footer/footer.component';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CodeService } from '../../services/code.service';

@Component({
  selector: 'app-passwordreset',
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
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  providers: [MessageService]
})

@Injectable({ providedIn: 'root' })
export class PasswordResetComponent {
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService,
    private codeService: CodeService
  ){}

    emailData: any = {
      to: '',
      subject: 'Jelszó visszaállítás',
      text: ''
    };

    generateCode() {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      this.emailData.text = "A jelszavad visszaállításához írd be ezt a kódot: "+code
      this.codeService.setCode(code);
    }

 sendEmail() {
    this.generateCode();
    this.api.sendEmail(this.emailData).subscribe(
      (res:any) => {
        console.log('Email sikeresen elküldve', res);
        this.router.navigate(['/pass-reset-sikeres'])
      },
      (error) => {
        console.error('Hiba az email küldésében', error);
      }
    );
  }
}
