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
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NewEvent } from '../../interfaces/events';
import { Token } from '@angular/compiler';
import { ToastModule } from 'primeng/toast';
import moment from 'moment';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-mod-event',
  standalone: true,
  imports: [  FormsModule, ButtonModule, CardModule, InputTextModule,InputTextareaModule, CalendarModule, SelectButtonModule, ToastModule, FooterComponent],
  templateUrl: './mod-event.component.html',
  styleUrl: './mod-event.component.scss',
  providers: [MessageService]
})
export class ModEventComponent implements OnInit{
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ){}

  selectedFile: File | null = null;

  value: string | undefined;
  date: Date[] | undefined;

  Catvalue!: number;

  today:any = moment().toDate();
  eventDateMoment:any="";
 
  categories: any[] = [];

  eventId: string='';
  event: any={
    eventName: '',
    eventStart: '',
    eventEnd: '',
    eventAddress: '',
    eventDate: '',
    userId: '',
    catId: '',
    description: '',
    image:'',
    category: ''
  }

  updateEvent: any={
    eventName: '',
    eventStart: '',
    eventEnd: '',
    eventAddress: '',
    eventDate: '',
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
    this.route.queryParams.subscribe(params => {
      this.eventId = params['Id'];
  
      // Csak akkor induljon, ha van eventId
      if (this.eventId) {
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

  uploadEvent(){
    const formData: FormData = new FormData();
    if (this.selectedFile) {
     
      const file: File | null = this.selectedFile;
      if (file) {
        //console.log('>>>>', file)
        formData.append('file', file);
      }
    }

    for (const key in this.updateEvent) {
      if (!this.updateEvent[key] && this.event[key] !== undefined) {
        this.updateEvent[key] = this.event[key];
      }
    }
    
    

    this.updateEvent.eventDate = moment(this.eventDateMoment).startOf('day').toISOString();

    formData.append('eventName', this.updateEvent.eventName);
    formData.append('eventStart', this.updateEvent.eventStart);
    formData.append('eventEnd', this.updateEvent.eventEnd);
    formData.append('eventAddress', this.updateEvent.eventAddress);
    formData.append('eventDate', this.updateEvent.eventDate);
    formData.append('catId', this.updateEvent.catId);
    formData.append('description', this.updateEvent.description);

   console.log(this.updateEvent)
    this.update(formData);
  }

  update(formData: FormData){
    console.log(formData);

    this.api.update('event', formData, this.eventId).subscribe({
      next: (res: any) => {
          this.showMessage('success', 'Siker', res.message);
                
      },
      error: (err: any) => {
          this.showMessage('error', 'Hiba', err.error.message);
      }
    });
  }

  backToOwn(){
    this.router.navigate(['/myevents'])
  }
  
  showMessage(tipus:string, cim:string, tartalom:string){
    this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
  }
}
