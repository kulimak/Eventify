import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';  
import {  MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';


interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, FormsModule, FloatLabelModule, PasswordModule, ButtonModule , RadioButtonModule,  MultiSelectModule, CalendarModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  userValue: string | undefined;
  passValue!: string;
  emailValue!: string;
  passConfirmValue!: string;
  birthValue: Date | undefined;

  cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}
