import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';


@Component({
  selector: 'app-newevent',
  standalone: true,
  imports: [  FormsModule, ButtonModule, CardModule, InputTextModule,InputTextareaModule, CalendarModule, SelectButtonModule],
  templateUrl: './newevent.component.html',
  styleUrl: './newevent.component.scss',
})
export class NeweventComponent {
  value: string | undefined;
  date: Date[] | undefined;


  Catvalue!: number;
    
  paymentOptions: any[] = [
      { name: 'Teszt1', value: 1 },
      { name: 'Teszt2', value: 2 },
      { name: 'Tesz3', value: 3 }
  ];
}
