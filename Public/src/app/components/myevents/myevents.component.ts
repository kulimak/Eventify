import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-myevents',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './myevents.component.html',
  styleUrl: './myevents.component.scss'
})
export class MyeventsComponent {

}
