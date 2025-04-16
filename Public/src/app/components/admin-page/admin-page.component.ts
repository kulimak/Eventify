import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  users: any[] = [];
  events: any[] = [];
  tableType: 'users' | 'events' = 'users';

  constructor() {}

  ngOnInit(): void {
    this.loadUsers(); // Betöltéskor a felhasználókat jelenítjük meg
  }

  loadUsers(): void {
    this.tableType = 'users';
    this.users = [
      { name: 'Teszt Elek', email: 'teszt@pelda.hu' },
      { name: 'Kovács Anna', email: 'anna@pelda.hu' },
      { name: 'Varga Péter', email: 'peter@pelda.hu' },
      
      { name: 'Teszt Elek', email: 'teszt@pelda.hu' },
      { name: 'Kovács Anna', email: 'anna@pelda.hu' },
      { name: 'Varga Péter', email: 'peter@pelda.hu' },
      
      { name: 'Teszt Elek', email: 'teszt@pelda.hu' },
      { name: 'Kovács Anna', email: 'anna@pelda.hu' },
      { name: 'Varga Péter', email: 'peter@pelda.hu' },
      { name: 'Teszt Elek', email: 'teszt@pelda.hu' },
      { name: 'Kovács Anna', email: 'anna@pelda.hu' },
      { name: 'Varga Péter', email: 'peter@pelda.hu' },
      
      { name: 'Teszt Elek', email: 'teszt@pelda.hu' },
      { name: 'Kovács Anna', email: 'anna@pelda.hu' },
      { name: 'Varga Péter', email: 'peter@pelda.hu' },
      
      { name: 'Teszt Elek', email: 'teszt@pelda.hu' },
      { name: 'Kovács Anna', email: 'anna@pelda.hu' },
      { name: 'Varga Péter', email: 'peter@pelda.hu' },
    ];
  }

  loadEvents(): void {
    this.tableType = 'events';
    this.events = [
      {
        title: 'Tech Meetup 2025',
        date: '2025-05-01',
        userId: 'Teszt Elek',
        description: 'Beszélgetés a legújabb technológiákról'
      },
      {
        title: 'Sportnap',
        date: '2025-06-15',
        userId: 'Teszt Elek',
        description: 'Futás, jóga, foci és frissítők'
      },
      {
        title: 'Önkéntes Nap',
        date: '2025-07-20',
        userId: 'Teszt Elek',
        description: 'Közösségi munka és ebéd a parkban'
      }
    ];
  }
}
