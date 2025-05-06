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
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-myevents',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule,
    InputTextModule, InputTextareaModule, CalendarModule,
    SelectButtonModule, ToastModule, FooterComponent,
    DatePipe],
  templateUrl: './myevents.component.html',
  styleUrl: './myevents.component.scss',
  providers: [MessageService]
})
export class MyeventsComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService
  ){}

  registeredEvents: string[] = [];

  ngOnInit(): void {
    this.api.getRegistrations('eventregistrations').subscribe((res: any) => {
      const userId = this.auth.loggedUser().id;
  
      // Szűrés a bejelentkezett user jelentkezéseire
      const userRegistrations = res.results.filter((r: any) => r.userId === userId);
  
      // Csak az eventId-ket tároljuk el
      this.registeredEvents = userRegistrations.map((r: any) => r.eventId);
  
      console.log(this.registeredEvents); // ['eventId1', 'eventId2', ...]
    });
  }
}
