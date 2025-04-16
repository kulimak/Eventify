import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-pass-reset-sikeres',
  standalone: true,
  imports: [
    InputTextModule, 
    FormsModule, 
    FloatLabelModule,
    PasswordModule,
    ButtonModule, 
    MessagesModule,
    ToastModule,
    RippleModule,
    CheckboxModule,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './pass-reset-sikeres.component.html',
  styleUrl: './pass-reset-sikeres.component.scss'
})
export class PassResetSikeresComponent {

}
