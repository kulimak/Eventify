import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from '../footer/footer.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-admin-events',
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
    TableModule,
    ConfirmDialogModule 
  ],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class AdminEventsComponent implements OnInit{

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}
  
  events: any[] = [{
    eventId: '',
    eventName: '',
    evenDate: '',
    userId: '',
    organizer: ''
  }];

  ngOnInit(): void {
  this.api.getEvents('event').subscribe((res: any) => {
    if (res.success === true && Array.isArray(res.results)) {
      this.events = res.results
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
      this.events = this.events.map(event => {
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

  deleteEvent(event:Event, eventId:string){
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
          this.api.deleteEvent('event', eventId).subscribe({
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
          this.showMessage('info', 'Törlés elutasítva', 'Elutasítottad az esemény törlését!');
      }
  });
  }
  
  modUser(id:string){
    this.router.navigate(['/moduser'], {
      queryParams: {
        Id: id
      }
    });
  }

  showMessage(tipus:string, cim:string, tartalom:string){
    this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
  }
}
