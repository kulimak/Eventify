import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { FooterComponent } from '../footer/footer.component';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import moment from 'moment';

@Component({
  selector: 'app-fooldal',
  standalone: true,
  imports: [
    RouterModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    MenubarModule,
    CommonModule,
    DialogModule,
    FooterComponent,
    CardModule,
    SidebarModule
  ],
  templateUrl: './fooldal.component.html',
  styleUrls: ['./fooldal.component.scss'],
  providers: [MessageService]
})
export class FooldalComponent implements OnInit{

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService
  ){}

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible: boolean = false;

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.sidebarVisible = false; // sidebar bezárása
    }
  }
  
  title = 'Főoldal';
  visible: boolean = false;

  categories: any[] = [];

  newestEvents:any[] = [];

  popularEvents:any[] = [];

  allEvents:any[] = [{
    Id:'',
    eventName: '',
    eventStart: '',
    eventEnd: '',
    eventAddress: '',
    eventDate: '',
    description: '',
    image: '',
    catId: '',
    category: ''
  }];

  ngOnInit(): void {
  // Előbb töltsük be a kategóriákat
  this.api.categories('categories').subscribe((catRes: any) => {
    if (catRes.success === true) {
      this.categories = catRes.results.map((cat: any) => ({
        name: cat.name,
        value: cat.Id
      }));

      // Ha megvannak a kategóriák, töltsük be az eseményeket
      this.api.getEvents('event').subscribe((res: any) => {
        if (res.success == true) {
          this.allEvents = res.results.map((event: any) => {
            const matchedCategory = this.categories.find(cat => String(cat.value) === String(event.catId));

            const eventDateValid = event.eventDate && moment(event.eventDate, 'YYYY-MM-DD', true).isValid();
            if (eventDateValid) {
              const eventDate = moment(event.eventDate, 'YYYY-MM-DD');
              if (eventDate.isSameOrAfter(moment(), 'day')) {
                this.newestEvents.push({
                  Id: event.Id,
                  eventName: event.eventName,
                  eventStart: event.eventStart,
                  eventEnd: event.eventEnd,
                  eventAddress: event.eventAddress,
                  eventDate: event.eventDate,
                  description: event.description,
                  image: event.image,
                  category: matchedCategory ? matchedCategory.name : ''
                });
              }
            }

            return {
              Id: event.Id,
              eventName: event.eventName,
              eventStart: event.eventStart,
              eventEnd: event.eventEnd,
              eventAddress: event.eventAddress,
              eventDate: event.eventDate,
              description: event.description,
              image: event.image,
              catId: event.catId,
              category: matchedCategory ? matchedCategory.name : ''
            };
          });
        }
      });
    }
  });
}

  navigateToEvent(event: any){
    this.router.navigate(['/event'], {
      queryParams: {
        Id: event.Id,
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventStart: event.eventStart,
        eventEnd: event.eventEnd,
        eventAddress: event.eventAddress,
        description: event.description,
        image: event.image
      }
    });
  }
}