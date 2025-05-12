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
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-event-rating',
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
    ConfirmDialogModule,
    CardModule
  ],
  templateUrl: './event-rating.component.html',
  styleUrl: './event-rating.component.scss',
  providers: [MessageService, ConfirmationService]
})

export class EventRatingComponent implements OnInit{
  
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ){}

  eventId: string='';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['Id'];
  
      // Csak akkor induljon, ha van eventId
      if (this.eventId) {

      }
    });
  }

  uploadrating(){
    
  }
}
