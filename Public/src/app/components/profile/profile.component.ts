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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { updatePassword, userProfile } from '../../interfaces/user';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import * as bcrypt from 'bcryptjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    ToastModule,
    TableModule,
    ConfirmDialogModule
    
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ProfileComponent implements OnInit{
  
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
  visiblePFP: boolean = false;
  visibleEmail: boolean = false;
  visibleUser: boolean = false;
  visiblePass: boolean = false;

  registeredEventId:any[] = [];

  registrationId:any[] = []

   EventDatas:any[] = [{
    eventId: '',
    eventName: '',
    userId: '',
    eventDate: '',
    organizer: '',
    registrationId: ''
  }];

  avgRating: number = 0;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  ngOnInit(): void {
    this.getLoggedUser();

    this.api.getAllById('eventregistrations', this.auth.loggedUser().id).subscribe((res: any) => {
      if (res.success == true) {
        res.results.forEach((registration: any) => {
          if (registration.eventId) {
            this.registeredEventId.push(registration.eventId);
            this.registrationId.push(registration.Id);
          }
        });
        this.loadRegisteredEvents()
      }
    });

    this.getUserRating(); // <<< EZ ITT LEGYEN
  }

  getUserRating() {
    this.api.getAllRatingById('userrating', this.auth.loggedUser().id).subscribe((res: any) => {
      if (res.success && res.results && res.results.length > 0) {
        const ratings = res.results
          .map((r: any) => parseFloat(r.rating))
          .filter((r: number) => !isNaN(r));

        const sum = ratings.reduce((acc: number, val: number) => acc + val, 0);
        this.avgRating = parseFloat((sum / ratings.length).toFixed(1));
      } else {
        this.avgRating = 0;
      }
    });
  }

  loadRegisteredEvents() {
  this.api.getEvents('event').subscribe((res: any) => {
    if (res.success === true && Array.isArray(res.results)) {
      this.EventDatas = res.results
        .filter((event: any) => this.registeredEventId.includes(event.Id))
        .map((event: any) => ({
          eventId: event.Id,
          eventName: event.eventName,
          userId: event.userId,
          eventDate: event.eventDate
        }));
    }
    //console.log(this.EventDatas)
    this.getEventOrganizer()
  });
}

getEventOrganizer() {
  this.api.getAllUsers('users').subscribe((res: any) => {
    if (res.success === true) {
      this.EventDatas = this.EventDatas.map(event => {
        const matchingUser = res.results.find((user: any) => user.Id === event.userId);
        return {
            ...event,
            organizer: matchingUser ? matchingUser.username : 'Ismeretlen'
          };
        });
      }
      //console.log(this.EventDatas);
    });
  }

  deleteRegistration(event:Event, id:number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Biztosan törlöd a jelentkezést?',
      header: 'Törlés megerősítése',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel: 'Igen',
      rejectLabel: 'Mégsem',

      accept: () => {
          this.api.deleteRegistration('eventregistrations', this.registrationId[id]).subscribe({
            next: (res: any) => {
              this.showMessage('success', 'Siker', res.results);

              setTimeout(() => {
                window.location.reload();
              }, 1500);
              
            },
            error: (err: any) => {
              this.showMessage('error', 'Hiba', err.error.message);
            }
          }); 
      },
      reject: () => {
          this.showMessage('error', 'Törlés elutasítva', 'Elutasítottad a jelentkezés törlését!');
      }
  });
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

  ertekeles(eventId:string){
    this.router.navigate(['/ratingevent'], {
      queryParams: {
        Id: eventId
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

  onWriterClick(userId:string){
    this.router.navigate(['/visit'], {
      queryParams: {
        Id: userId
      }
    });
  }

  showMessage(tipus:string, cim:string, tartalom:string){
      this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
    }
}
