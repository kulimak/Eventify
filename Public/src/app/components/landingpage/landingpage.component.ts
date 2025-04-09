import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FooterComponent } from '../footer/footer.component';



@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterModule, InputIconModule, IconFieldModule, InputTextModule, ButtonModule, FormsModule, MenubarModule, CommonModule, DialogModule, FooterComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  title = 'Főoldal';

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
          label: 'Esemény tervezés',
          icon: 'pi pi-file',
          routerLink: '/newevent',
        },
        
        {
            label: 'Felhasználó Feltételek',
            icon: 'pi pi-file',
            routerLink: '/',
            command: () => this.showDialog()
        },

        {
            label: 'Események',
            icon: 'pi pi-calendar',
            routerLink: '/'
        },

        {
            label: 'Belépés',
            icon: 'pi pi-sign-in',
            routerLink: '/login',
            command: () => this.loginNav()
            
        },

        {
            label: 'Regisztráció',
            icon: 'pi pi-user-plus',
            routerLink: '/'
        }
    ]
}
    loginNav(): void {
        console.log("Ez navigál a loginra")
    }
}
