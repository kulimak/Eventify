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
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { updatePassword, userProfile } from '../../interfaces/user';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import * as bcrypt from 'bcryptjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-event-rating',
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
    ConfirmDialogModule,
    CardModule
  ],
  templateUrl: './event-rating.component.html',
  styleUrl: './event-rating.component.scss',
  providers: [MessageService, ConfirmationService]
})

export class EventRatingComponent implements OnInit{
  
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ){}

  categories: any[] = [];

  event: any={
    Id:'',
    eventName: '',
    eventStart: '',
    eventEnd: '',
    eventAddress: '',
    eventDate: '',
    userId: '',
    catId: '',
    description: '',
    image:'',
    category: '',
    organizer: ''
  }

  newRating:any={
    rating:'',
    opinion:'',
    eventId:'',
    userId: this.auth.loggedUser().id
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.newRating.eventId = params['Id'];
  
      // Csak akkor induljon, ha van eventId
      if (this.newRating.eventId) {
        this.getCategroies();
      }
    });
  }
  
  getCategroies() {
    this.api.categories('categories').subscribe((res: any) => {
      if (res.success === true) {
        this.categories = res.results.map((cat: any) => ({
          name: cat.name,
          value: cat.Id
        }));
  
        // Csak akkor kérjük le az eseményt, ha már megvannak a kategóriák
        this.getEventById();
      }
    });
  }
  
  getEventById() {
    this.api.getEventById('event', this.newRating.eventId).subscribe((res: any) => {
      this.event = {
        Id: res.results.Id,
        eventName: res.results.eventName,
        eventStart: res.results.eventStart,
        eventEnd: res.results.eventEnd,
        eventAddress: res.results.eventAddress,
        eventDate: res.results.eventDate,
        userId: res.results.userId,
        catId: res.results.catId,
        description: res.results.description,
        image: res.results.image
      };
  
      // Most már biztos, hogy van catId és kategóriák -> lehet keresni
      this.getCategoryName();
    });
  }

  getEventOrganizer(){
    this.api.getUser('users', this.event.userId).subscribe((res:any)=>{
      this.event.organizer = res.results.username;
    });

  }
  
  getCategoryName() {
    const matchedCategory = this.categories.find(cat => String(cat.value) === String(this.event.catId));
    if (matchedCategory) {
      this.event.category=matchedCategory.name
      this.getEventOrganizer();
    } else {
      console.log('Nincs találat');
    }
  }

  backToProfile(){
    this.router.navigate(['/profile'])
  }

  uploadrating(){
    this.api.newEventRating('eventrating', this.newRating).subscribe({
        next: (res: any) => {
            this.showMessage('success', 'Siker', res.message);
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
