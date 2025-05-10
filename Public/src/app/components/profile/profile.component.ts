import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FooterComponent } from '../footer/footer.component';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { updatePassword, userProfile } from '../../interfaces/user';
import { ToastModule } from 'primeng/toast';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    DialogModule,
    FooterComponent,
    RatingModule,
    InputTextareaModule,
    ToastModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [MessageService]
})
export class ProfileComponent implements OnInit{
  
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService
  ){}

  profileDatas:userProfile={
    image: '',
    username: '',
    email: '',
    password: ''
  }
  
  newUsername:any="";
  newEmail:string="";
  passwordValue:string= "";

  newPasswords:updatePassword={
    password: '',
    confirm: ''
  }
  
  selectedFile: File | null = null;

  userValue: string | undefined;
  ratingValue: number = 5;
  visiblePFP: boolean = false;
  visibleEmail: boolean = false;
  visibleUser: boolean = false;
  visiblePass: boolean = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  ngOnInit(): void {
    this.getLoggedUser()
  }

  getLoggedUser(){
    this.api.getUser('users', this.auth.loggedUser().id).subscribe((res:any)=>{
      if (res.success == true) {
        this.profileDatas = {
          image: res.results.image,
          username: res.results.username,
          email: res.results.email,
          password: res.results.password
        };
      }
    });
  }

  
  uploadPFP(){
    this.visiblePFP = false;
    const formData: FormData = new FormData();
    if (this.selectedFile) {
     
      const file: File | null = this.selectedFile;
      if (file) {
        formData.append('file', file);
      }
    }
    this.createEvent(formData);
  }

  createEvent(formData: FormData){
    //console.log(formData);

    this.api.uploadPfp('users', this.auth.loggedUser().id, formData).subscribe({
      next: (res: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        this.showMessage('error', 'Hiba', err.error.message);
      }
    }); 
  }

  updateUserName(){
    this.api.username('users', this.auth.loggedUser().id, this.newUsername).subscribe({
      next: (res: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        this.showMessage('error', 'Hiba', 'Nem adtál meg új felhasználónevet!');
      }
    });
    this.visibleUser=false
  }

  updateEmail(){
    this.api.email('users', this.auth.loggedUser().id, this.newEmail).subscribe({
      next: (res: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        this.showMessage('error', 'Hiba', 'Nem adtál meg új email címet!');
      }
    });
    this.visibleEmail=false
  }

  updatePassword() {
    bcrypt.compare(this.passwordValue, this.profileDatas.password).then((isMatch) => {
      if (isMatch) {
        this.api.password('users', this.auth.loggedUser().id, this.newPasswords).subscribe({
          next: (res: any) => {
            window.location.reload()
          },
          error: (err: any) => {
            this.showMessage('error', 'Hiba', err.error.message);
          }
        });
      } else {
        this.showMessage('error', 'Hiba', 'A jelenlegi jelszó hibás');
      }
    });
  }
  showPfpDialog() {
    this.visiblePFP = true;
  }

  showUserNameDialog() {
        this.visibleUser = true;
    }

  showEmailDialog() {
      this.visibleEmail = true;
    }

  showPasswdDialog() {
      this.visiblePass = true;
    }

  showMessage(tipus:string, cim:string, tartalom:string){
      this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
    }
}
