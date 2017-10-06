import { Component, OnInit } from '@angular/core';

import { PersonService } from './services/person.service';
import { Person } from './models/person';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PersonService]
})
export class AppComponent implements OnInit  {
  public title: string;
  public person: Person;
  public message: string;

  constructor(
    private _personService: PersonService
  ) {
    this.person = new Person(0, '', '', '', '', '', '', 1);
  }

  ngOnInit() {
    console.log('app.component.ts cargado...');
  }

  onSubmit() {
    console.log(this.person);
    this.saveProducto();
  }

  saveProducto() {
    this._personService.addPerson(this.person).subscribe(
      response => {
        if (response.code == 200) {
          this.message = response.message;
          this.person = new Person(0, '', '', '', null, '', '', 1);
          console.log(response);
        }else {
          console.log(response);
          this.message = response.message;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
