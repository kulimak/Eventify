import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-myevents',
  standalone: true,
  imports: [CardModule, ButtonModule, FooterComponent],
  templateUrl: './myevents.component.html',
  styleUrl: './myevents.component.scss'
})
export class MyeventsComponent {

}
