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
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

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
    RouterModule,
    ToastModule,
    RippleModule
  ],
  templateUrl: './company-reg.component.html',
  styleUrl: './company-reg.component.scss',
  providers: [MessageService]
})
export class CompanyRegComponent {
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService
  ){}

  companyReg:CompanyRegister={
    cegnev: '',
    adoszam: '',
    jegyzekszam: '',
    szekhely: '',
    nev: '',
    telefon: '',
    password: '',
    confirm:'',
    email: '',
    role:'company'
  }
  register(){
    if (this.companyReg.cegnev=="" || this.companyReg.adoszam=="" || this.companyReg.jegyzekszam=="" || this.companyReg.szekhely=="" || this.companyReg.nev=="" || this.companyReg.telefon=="" || this.companyReg.password=="" || this.companyReg.confirm=="" || this.companyReg.email=="") {
      this.showMessage('error','Hiba','Nem adtál meg minden adatot!');
    }
    else{
      if (this.companyReg.password!=this.companyReg.confirm) {
        this.showMessage('error','Hiba','A jelszavak nem egyeznek!')
      }
      else{
       this.api.companyReg(`company`,this.companyReg).subscribe((res:any)=>{
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
