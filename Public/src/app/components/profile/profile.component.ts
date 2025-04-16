import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FooterComponent } from '../footer/footer.component';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InputTextModule, FormsModule, FloatLabelModule, PasswordModule, ButtonModule, DialogModule, FooterComponent, RatingModule, InputTextareaModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userValue: string | undefined;
  emailValue!: string;
  passwordValue!: string;
  newPasswordValue!: string;
  ratingValue: number = 5;
  visibleEmail: boolean = false;
  visibleUser: boolean = false;
  visiblePass: boolean = false;

    showUserNameDialog() {
        this.visibleUser = true;
    }
    showEmailDialog() {
      this.visibleEmail = true;
    }
    showPasswdDialog() {
      this.visiblePass = true;
    }
}
