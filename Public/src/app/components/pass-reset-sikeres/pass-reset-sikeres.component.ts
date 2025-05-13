import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  selector: 'app-pass-reset-sikeres',
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
  templateUrl: './pass-reset-sikeres.component.html',
  styleUrl: './pass-reset-sikeres.component.scss',
  providers: [MessageService]
})

export class PassResetSikeresComponent implements OnInit{
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService,
    private codeService: CodeService
  ){}

  code: string = '';
  inputCode: string = '';

  ngOnInit() {
    this.code = this.codeService.getCode();
    console.log(this.code)
  }

  checkingCodes(){
    if (this.inputCode===this.code) {
      this.router.navigate(['/pass-reset-final'])
    }
  }
}
