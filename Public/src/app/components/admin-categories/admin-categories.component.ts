import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from '../footer/footer.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [  
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    ToastModule,
    FooterComponent,
    TableModule,
    ConfirmDialogModule 
  ],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.scss',
  providers: [MessageService, ConfirmationService]
})

export class AdminCategoriesComponent implements OnInit{

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router : Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}

  categories: any[]=[];
  category: string = '';

  ngOnInit(): void {
    this.api.categories('categories').subscribe((res:any) => {
      this.categories = res.results.map((item: any) => ({
        name: item.name
      }));
    });
  }

  addNewCategory(){
    this.api.newcategory('categories', this.category).subscribe((res:any) => {
      if (res.success == true) {
        this.showMessage('success', 'Sikeres feltöltés', res.message);
        this.category = '';
        this.ngOnInit()
      }
    })
  }

  showMessage(tipus:string, cim:string, tartalom:string){
    this.messageService.add({ severity: tipus, summary: cim, detail: tartalom, key: 'bc', life: 3000 });
  }
}
