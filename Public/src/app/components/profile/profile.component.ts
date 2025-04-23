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
import { userProfile } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InputTextModule, FormsModule, FloatLabelModule, PasswordModule, ButtonModule, DialogModule, FooterComponent, RatingModule, InputTextareaModule],
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
    image:'',
    username:''
  }
  
  selectedFile: File | null = null;

  userValue: string | undefined;
  emailValue!: string;
  passwordValue!: string;
  newPasswordValue!: string;
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
    this.api.getUser('users',this.auth.loggedUser().id).subscribe((res:any)=>{
      if (res.success == true) {
        this.profileDatas = {
          image: res.results.image,
          username: res.results.username
        };
      }
      //console.log(this.profileDatas)
    });
  }

  /*getProfileImage(): string {
    return this.profileDatas.image
      ? `http://localhost:3000/uploads/${this.profileDatas.image}`
      : `http://localhost:3000/uploads/default.jpg`;
  }*/
  
  uploadPFP(){
    this.visiblePFP = false;
    const formData: FormData = new FormData();
    if (this.selectedFile) {
     
      const file: File | null = this.selectedFile;
      if (file) {
        //console.log('>>>>', file)
        formData.append('file', file);
      }
    }
    this.createEvent(formData);
  }

  createEvent(formData: FormData){
    console.log(formData);

    this.api.uploadPfp('users', this.auth.loggedUser().id, formData).subscribe({
      next: (res: any) => {
        window.location.reload();
      },
      error: (err: any) => {

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
}
