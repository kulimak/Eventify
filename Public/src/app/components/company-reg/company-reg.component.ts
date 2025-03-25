import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';  
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule } from '@angular/router';

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
  companyName: string = '';
  taxNumber: string = '';
  companyId: string = '';
  companyAddress: string = '';
  contactName: string = '';
  contactPhone: string = '';
  emailValue: string = '';
  passValue: string = '';
  passConfirmValue: string = '';

  registerCompany() {
    console.log('Céges regisztrációs adatok:', {
      companyName: this.companyName,
      taxNumber: this.taxNumber,
      companyId: this.companyId,
      companyAddress: this.companyAddress,
      contactName: this.contactName,
      contactPhone: this.contactPhone,
      email: this.emailValue,
      password: this.passValue
    });
  }
}
