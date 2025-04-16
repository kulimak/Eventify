import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InputTextModule, FormsModule, FloatLabelModule, PasswordModule, ButtonModule, DialogModule, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userValue: string | undefined;
  emailValue!: string;
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
