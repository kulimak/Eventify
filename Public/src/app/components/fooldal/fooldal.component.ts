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

@Component({
  selector: 'app-fooldal',
  standalone: true,
  imports: [RouterModule, InputIconModule, IconFieldModule, InputTextModule, ButtonModule, FormsModule, MenubarModule, CommonModule, DialogModule, FooterComponent],
  templateUrl: './fooldal.component.html',
  styleUrl: './fooldal.component.scss'
})
export class FooldalComponent {
  title = 'Főoldal';
  
  visible: boolean = false;
}
