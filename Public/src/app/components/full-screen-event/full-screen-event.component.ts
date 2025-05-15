import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-full-screen-event',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    ToastModule,
    FooterComponent,
    DatePipe,
    TableModule,
    RatingModule,
    ConfirmDialogModule
  ],
  templateUrl: './full-screen-event.component.html',
  styleUrl: './full-screen-event.component.scss',  
  providers: [MessageService, ConfirmationService]
})
export class FullScreenEventComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}

  currentUserId:any=this.auth.loggedUser().id;
  eventId:any='';
  event:any = {};

  eventRegistration:any= {
    userId: this.auth.loggedUser().id,
    eventId: this.eventId
  }

  eventDateMoment: Date = new Date();

  categories:any[] = [];

  Ratings:any[]=[{
    Id: '',
    rating: '',
    opinion: '',
    eventId: '',
    userId: '',
    writer:''
  }];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['Id'];
  
      // Csak akkor induljon, ha van eventId
      if (this.eventId) {
        this.eventRegistration.eventId = this.eventId
        this.getCategroies();
        this.getRatings();
      }
    });
  }

  getRatings() {
    this.api.getAllRatingById('eventrating', this.eventId).subscribe((res: any) => {
      if (res.success && res.results) {
        this.Ratings = res.results.map((item: any) => {
          return {
            Id: item.Id,
            rating: Number(item.rating),
            opinion: item.opinion,
            eventId: item.eventId,
            userId: item.userId
          };
        });
        this.loadRateWriter()
      }
    });
  }

  loadRateWriter(){
  this.api.getAllUsers('users').subscribe((res: any) => {
    if (res.success === true) {
      this.Ratings = this.Ratings.map(rating => {
        const matchingUser = res.results.find((user: any) => user.Id === rating.userId);
        return {
            ...rating,
            writer: matchingUser ? matchingUser.username : 'Ismeretlen'
          };
        });
      }
      //console.log(this.EventDatas);
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
    this.api.getEventById('event', this.eventId).subscribe((res: any) => {
      this.event = {
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
  
  getCategoryName() {
    const matchedCategory = this.categories.find(cat => String(cat.value) === String(this.event.catId));
    if (matchedCategory) {
      this.event.category=matchedCategory.name
    } else {
      console.log('Nincs találat');
    }
  }


  registration(){
    this.api.eventregistrations('eventregistrations', this.eventRegistration).subscribe({
      next: (res: any) => {
        this.showMessage('success', 'Siker', res.message)
        setTimeout(() => {
          this.router.navigate(['/fooldal'])
        }, 1500);
      },
      error: (err: any) => {
        this.showMessage('error', 'Hiba', err.error.message);
      }
    });
  }

  deleteRating(event:Event, raintgId:any){
      this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Biztosan törlöd ezt az eseményt?',
      header: 'Törlés megerősítése',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel: 'Igen',
      rejectLabel: 'Mégsem',

      accept: () => {
          this.api.deleteRating('eventrating', raintgId).subscribe({
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
          this.showMessage('error', 'Törlés elutasítva', 'Elutasítottad az vélemény törlését!');
      }
    });
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
