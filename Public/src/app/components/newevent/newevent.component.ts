import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NewEvent } from '../../interfaces/events';
import { Token } from '@angular/compiler';
import { ToastModule } from 'primeng/toast';
import moment from 'moment';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-newevent',
  standalone: true,
  imports: [  FormsModule, ButtonModule, CardModule, InputTextModule,InputTextareaModule, CalendarModule, SelectButtonModule, ToastModule, FooterComponent],
  templateUrl: './newevent.component.html',
  styleUrl: './newevent.component.scss',
  providers: [MessageService]
})

export class NeweventComponent implements OnInit{
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService
  ){}

  selectedFile: File | null = null;

  value: string | undefined;
  date: Date[] | undefined;

  Catvalue!: number;
  eventDateMoment:any="";
  categories: any[] = [];

  newEvent:NewEvent={
    eventName: '',
    eventStart: '',
    eventEnd: '',
    eventAddress: '',
    eventDate: '',
    userId: '',
    catId: '',
    description: ''
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  ngOnInit(): void {
    this.api.categories('categories').subscribe((res: any) => {
      if (res.success == true) {
        this.categories = res.results.map((cat: any) => ({
          name: cat.name,  
          value: cat.Id     
        }));
      }
    });
  }
  uploadEvent(){
    const formData: FormData = new FormData();
    if (this.selectedFile) {
     
      const file: File | null = this.selectedFile;
      if (file) {
        //console.log('>>>>', file)
        formData.append('file', file);
      }
    }
    this.eventDateMoment=moment(this.eventDateMoment).format('YYYY-MM-DD');
    this.newEvent.eventDate=this.eventDateMoment;

    formData.append('eventName', this.newEvent.eventName);
    formData.append('eventStart', this.newEvent.eventStart);
    formData.append('eventEnd', this.newEvent.eventEnd);
    formData.append('eventAddress', this.newEvent.eventAddress);
    formData.append('eventDate', this.newEvent.eventDate);
    formData.append('userId', this.auth.loggedUser().id);
    formData.append('catId', this.newEvent.catId);
    formData.append('description', this.newEvent.description);

   
    this.createEvent(formData);
  }

  createEvent(formData: FormData){
    console.log(formData);

    this.api.newEvent('event', formData).subscribe({
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
