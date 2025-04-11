import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { FooterComponent } from '../footer/footer.component';
import { CardModule } from 'primeng/card';

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
    CardModule
  ],
  templateUrl: './fooldal.component.html',
  styleUrls: ['./fooldal.component.scss'] 
})
export class FooldalComponent {
  title = 'Főoldal';
  visible: boolean = false;

  newestEvents = [
    {
      title: 'Esemény neve',
      description: 'Esemény leírása',
      image: 'https://www.primefaces.org/cdn/primeng/images/card-ng.jpg',
      date: '2025-04-11', // hozzáadott dátum
      address: 'Példa utca 123',
      start: '2025-04-11 10:00',  // Esemény kezdete
      end: '2025-04-11 12:00'    // Esemény vége
   // Hozzáadott cím
    },
    {
      title: 'Esemény neve',
      description: 'Esemény leírása',
      image: 'https://www.primefaces.org/cdn/primeng/images/card-ng.jpg',
      date: '2025-04-11', 
      address: 'Példa utca 123',
      start: '2025-04-11 10:00', 
      end: '2025-04-11 12:00'  
  
    },
    {
      title: 'Esemény neve',
      description: 'Esemény leírása',
      image: 'https://www.primefaces.org/cdn/primeng/images/card-ng.jpg',
      date: '2025-04-11', 
      address: 'Példa utca 123',
      start: '2025-04-11 10:00', 
      end: '2025-04-11 12:00' 

    },
    {
      title: 'Esemény neve',
      description: 'Esemény leírása',
      image: 'https://www.primefaces.org/cdn/primeng/images/card-ng.jpg',
      date: '2025-04-11', 
      address: 'Példa utca 123',
      start: '2025-04-11 10:00',  
      end: '2025-04-11 12:00'    

    },
    {
      title: 'Esemény neve',
      description: 'Esemény leírása',
      image: 'https://www.primefaces.org/cdn/primeng/images/card-ng.jpg',
      date: '2025-04-11', 
      address: 'Példa utca 123',
      start: '2025-04-11 10:00',  
      end: '2025-04-11 12:00' 
    },
  ];

  popularEvents = [
    {
      title: 'Népszerű esemény 1',
      description: 'Ez a népszerű esemény 1 leírása.',
      image: 'https://www.primefaces.org/cdn/primeng/images/card-ng.jpg',
      date: '2025-04-12',
      address: 'Népszerű cím 1',
      start: '2025-04-12 08:00',
      end: '2025-04-12 10:00'
    },
    {
      title: 'Népszerű esemény 2',
      description: 'Ez a népszerű esemény 2 leírása.',
      image: 'https://www.primefaces.org/cdn/primeng/images/card-ng.jpg',
      date: '2025-04-13',
      address: 'Népszerű cím 2',
      start: '2025-04-13 09:00',
      end: '2025-04-13 11:00'
    },
    {
      title: 'Népszerű esemény 1',
      description: 'Ez a népszerű esemény 1 leírása.',
      image: 'https://www.primefaces.org/cdn/primeng/images/card-ng.jpg',
      date: '2025-04-12',
      address: 'Népszerű cím 3',
      start: '2025-04-12 08:00',
      end: '2025-04-12 10:00'
    },
    {
      title: 'Népszerű esemény 2',
      description: 'Ez a népszerű esemény 2 leírása.',
      image: 'https://www.primefaces.org/cdn/primeng/images/card-ng.jpg',
      date: '2025-04-13',
      address: 'Népszerű cím 4',
      start: '2025-04-13 09:00',
      end: '2025-04-13 11:00'
    },
    // További népszerű események...
  ];
}