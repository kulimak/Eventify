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
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-myevents',
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
    ConfirmDialogModule
  ],
  templateUrl: './myevents.component.html',
  styleUrl: './myevents.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class MyeventsComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}

  ownEvents:any[] = [{
    Id:'',
    eventName: '',
    eventStart: '',
    eventEnd: '',
    eventAddress: '',
    eventDate: '',
    description: '',
    image:''
  }];

  ngOnInit(): void {
    this.api.getEvents('event').subscribe((res: any) => {
      const userId = this.auth.loggedUser().id;
  
      // Szűrés a bejelentkezett user által létrehozott eseményekre
      this.ownEvents = res.results.filter((r: any) => r.userId === userId);
  
      //console.log(this.ownEvents);
    });
  }

  deleteEvent(event: Event, eventId:string) {
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
          this.api.deleteEvent('event',eventId).subscribe({
            next: (res: any) => {
              this.showMessage('success', 'Siker', res.results);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            },
            error: (err: any) => {
              this.showMessage('error', 'Hiba', err.error.message);
            }
          }); 
      },
      reject: () => {
          this.showMessage('error', 'Törlés elutasítva', 'Elutasítottad az esemény törlését!');
      }
  });
  }

  showMessage(tipus:string, cim:string, tartalom:string){
    this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
  }
}
