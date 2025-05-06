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
  selector: 'app-full-screen-event',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, CardModule,
    InputTextModule, InputTextareaModule, CalendarModule,
    SelectButtonModule, ToastModule, FooterComponent,
    DatePipe
  ],
  templateUrl: './full-screen-event.component.html',
  styleUrl: './full-screen-event.component.scss',  
  providers: [MessageService]
})
export class FullScreenEventComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService
  ){}

  event:any = {
    Id: '',
    eventName: '',
    description: '',
    eventAddress: '',
    eventStart:'',
    eventEnd: '',
    catId: '',
    image: ''
  };

  eventRegistration:any= {
    userId: this.auth.loggedUser().Id,
    eventId: this.event.Id
  }

  eventDateMoment: Date = new Date();

  categories = [
    { name: 'Sport', value: 1 },
    { name: 'Zene', value: 2 },
    { name: 'Művészet', value: 3 }
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.event = {
        Id: params['Id'],
        eventName: params['eventName'],
        description: params['description'],
        eventAddress: params['eventAddress'],
        eventStart: params['eventStart'],
        eventEnd: params['eventEnd'],
        catId: params['catId'],
        image: params['image']
      };
    });
  }

  getCategoryName(catId: number): string {
    const category = this.categories.find(c => c.value === catId);
    return category ? category.name : 'Ismeretlen';
  }

  registration(){
    this.api.eventregistrations('/eventregistrations',this.eventRegistration).subscribe((res:any)=>{

    });
  }

}
