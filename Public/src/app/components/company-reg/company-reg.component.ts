import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';  
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CompanyRegister } from '../../interfaces/company';
import { CompanyLogin } from '../../interfaces/company';

@Component({
  selector: 'app-company-reg',
  standalone: true,
  imports: [
    InputTextModule, 
    FormsModule, 
    FloatLabelModule, 
    PasswordModule, 
    ButtonModule, 
    RadioButtonModule,  
    MultiSelectModule, 
    CalendarModule, 
    RouterModule
  ],
  templateUrl: './company-reg.component.html',
  styleUrl: './company-reg.component.scss'
})
export class CompanyRegComponent {
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService
  ){}


  register() {
    alert('helomukszil')
  }
}
