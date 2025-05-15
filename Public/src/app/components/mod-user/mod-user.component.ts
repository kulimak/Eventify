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
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-mod-user',
  standalone: true,
  imports: [  
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    ToastModule,
    FooterComponent,
    DropdownModule
  ],
  templateUrl: './mod-user.component.html',
  styleUrl: './mod-user.component.scss',
  providers: [MessageService]
})

export class ModUserComponent implements OnInit{

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ){}

  categories: any[] = [];

  roles: any[]=[];
  status: any[]=[];

  userId: string='';
  user: any={
    username: '',
    email: '',
    favCategories: '',
    birthDate: '',
    role: '',
    status: '',
    image: '',
    category: '',
  }

  updateUser: any={
    role: '',
    status: ''
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['Id'];
  
      // Csak akkor induljon, ha van eventId
      if (this.user) {
        this.getCategroies();
      }
    });

    this.roles=[
      { name: 'user', code: 'user' },
      { name: 'admin', code: 'admin' },
    ]

    this.status=[
      { name: 'active', code: 'active' },
      { name: 'inactive', code: 'inactive' },
    ]
  }

  getCategroies() {
    this.api.categories('categories').subscribe((res: any) => {
      if (res.success === true) {
        this.categories = res.results.map((cat: any) => ({
          name: cat.name,
          value: cat.Id
        }));
  
        // Csak akkor kérjük le az eseményt, ha már megvannak a kategóriák
        this.getUserById();
      }
    });
  }

  getUserById(){
        this.api.getUser('users', this.userId).subscribe((res: any) => {
      this.user = {
        username: res.results.username,
        email: res.results.email,
        favCategories: res.results.favCategories,
        birthDate: moment(res.results.birthDate).format('YYYY-MM-DD'),
        role: res.results.role,
        status: res.results.status,
        image: res.results.image,
      };
      //console.log(res.results)
      // Most már biztos, hogy van catId és kategóriák -> lehet keresni
      this.getCategoryNames();
    });
  }

getCategoryNames() {
  const categoryIds = this.user.favCategories
    .split(',')
    .map((id:any) => id.trim())
    .filter((id:any) => id !== '');

  const matchedCategories = this.categories
    .filter(cat => categoryIds.includes(String(cat.value)))
    .map(cat => cat.name);

  if (matchedCategories.length > 0) {
    this.user.category = matchedCategories.join(', ');
  } else {
    console.log('Nincs találat');
  }
}

syncData(){
  if (
    this.updateUser.role !== this.user.role ||
    this.updateUser.status !== this.user.status
  ) {
    this.editUser();
  } else {
    this.showMessage('info', 'Nincs változás', 'Nem történt módosítás.');
}
}

  editUser(){
      this.api.rolestatus('users', this.userId, this.updateUser).subscribe({
        next: (res: any) => {
            this.showMessage('success', 'Siker', res.message);

            setTimeout(() => {
              window.location.reload();
            }, 1500);
        },
        error: (err: any) => {
            this.showMessage('error', 'Hiba', err.error.message);
        }
    })
  }

  backToTable(){
    this.router.navigate(['/adminpage'])
  }

    showMessage(tipus:string, cim:string, tartalom:string){
    this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
  }
}
