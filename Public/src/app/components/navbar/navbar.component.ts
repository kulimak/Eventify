import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule, FormsModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit{
  constructor(
    private auth: AuthService
  ){}
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  

  items: MenuItem[] | undefined;

  ngOnInit(): void{
    this.auth.isLoggedIn$.subscribe(res => {
      this.setupMenu(res)
    });
  }

  setupMenu(isLoggedIn:boolean){
    this.items = [
      ...(isLoggedIn) ? [
        ...(this.auth.isUser()) ? [
          {
            label: 'Statisztika', icon: 'pi pi-file', routerLink: '/stats'
          },
          {
            label: 'Események', icon: 'pi pi-calendar', routerLink: '/'
          },
          {
            label: 'Profil',icon: 'pi pi-user', routerLink: '/profile'
          },
          {
            label:'Kijelentkezés', icon: 'pi pi-sign-out', command: ()=>this.auth.logout()
          } 

        ] : [
          
        ]

      ] : [
          {
            label: 'Belépés',icon: 'pi pi-sign-in',routerLink: '/login',     
          },
          
          {
            label: 'Regisztráció',icon: 'pi pi-user-plus',routerLink: '/register'
          },

          {
            label: 'Felhasználó Feltételek',icon: 'pi pi-file',command: () => this.showDialog()
          },
          
          {
            label: 'Vissza a főoldalra',icon: 'pi pi-home', routerLink: '/landingpage'
          }
      ]
    ];
  }
  
}
