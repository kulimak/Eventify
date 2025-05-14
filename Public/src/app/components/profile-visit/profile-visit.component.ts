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
import moment from 'moment';

@Component({
  selector: 'app-profile-visit',
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
  templateUrl: './profile-visit.component.html',
  styleUrl: './profile-visit.component.scss',
  providers: [MessageService, ConfirmationService]
})

export class ProfileVisitComponent implements OnInit{

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ){}

  categories: any[] = [];


  profileDatas:any = {
    username: '',
    birthDate: '',
    email: '',
    favCategories: '',
    category: ''
  };
  events:any[] = [{
    Id:'',
    eventName:'',
    eventDate:'',
    catId:''
  }]; 

  userRating:number = 0;
  userId:string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['Id'];
  
      // Csak akkor induljon, ha van userId
      if (this.userId) {
        this.getUser();
        this.getEvents();
      }
    });
  }

getEvents() {
  this.api.getAllEventByUserId('event', this.userId).subscribe((res: any) => {
    if (res.success && res.results) {
      this.events = res.results.map((event: any) => ({
        Id: event.Id,
        eventName: event.eventName,
        eventDate: event.eventDate,
        catId: event.catId,
        category: ''  // később töltjük fel
      }));
    }

    // Kategórianév hozzárendelése csak akkor, ha már megvannak a kategóriák
    if (this.categories.length > 0) {
      this.attachCategoryNames();
    }
  });
}

  attachCategoryNames() {
    this.events = this.events.map(event => {
      const matchedCategory = this.categories.find(cat => String(cat.value) === String(event.catId));
      return {
        ...event,
        category: matchedCategory ? matchedCategory.name : 'Ismeretlen kategória'
      };
    });
  }

  getUser() {
    this.api.getUser('users', this.userId).subscribe((res: any) => {
      this.profileDatas = {
        username: res.results.username,
        birthDate: moment(res.results.birthDate).format('YYYY-MM-DD'),
        email: res.results.email,
        favCategories: res.results.favCategories
      };

      this.getCategories()
    });
  }

  getCategories() {
    this.api.categories('categories').subscribe((res: any) => {
      if (res.success === true) {
        this.categories = res.results.map((cat: any) => ({
          name: cat.name,
          value: cat.Id
        }));

        this.loadCategories();
        this.attachCategoryNames(); // <<< ez fontos
      }
    });
  }

  loadCategories() {
    const categoryIds = this.profileDatas.favCategories
      .split(',')
      .map((id: string) => id.trim())
      .filter((id: string) => id !== '');

    const matchedCategories = this.categories
      .filter(cat => categoryIds.includes(String(cat.value)))
      .map(cat => cat.name);

    if (matchedCategories.length > 0) {
      this.profileDatas.category = matchedCategories.join(', ');
    } else {
      this.profileDatas.category = '';
      console.log('Nincs találat');
    }

    console.log(this.categories, this.profileDatas.category);
  }

  openEvent(eventId:string){
    this.router.navigate(['/event'], {
      queryParams: {
        Id: eventId,
      }
    });
  }
}
