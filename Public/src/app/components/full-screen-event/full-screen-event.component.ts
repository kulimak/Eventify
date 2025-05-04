import { Component } from '@angular/core';
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
  styleUrl: './full-screen-event.component.scss'
})
export class FullScreenEventComponent {
  newEvent = {
    eventName: 'Példa esemény',
    description: 'Ez egy példa leírás az eseményhez.',
    eventAddress: '1234 Budapest, Fő utca 1.',
    eventStart: '08:00',
    eventEnd: '10:00',
    catId: 1
  };

  eventDateMoment: Date = new Date();

  categories = [
    { name: 'Sport', value: 1 },
    { name: 'Zene', value: 2 },
    { name: 'Művészet', value: 3 }
  ];
  getCategoryName(catId: number): string {
    const category = this.categories.find(c => c.value === catId);
    return category ? category.name : 'Ismeretlen';
  }
  
}
