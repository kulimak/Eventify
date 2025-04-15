import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']  
})
export class AdminPageComponent implements OnInit {
  users: any[] = [];
  events: any[] = [];
  tableType: 'users' | 'events' = 'users'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<any[]>('/').subscribe(data => {
      this.users = data;
      this.tableType = 'users';
    });
  }

  loadEvents(): void {
    this.http.get<any[]>('/').subscribe(data => {
      this.events = data;
      this.tableType = 'events';
    });
  }
}
