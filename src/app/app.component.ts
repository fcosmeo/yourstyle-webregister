import { Component, OnInit } from '@angular/core';
import {AlertCenterService} from './modules';
import {AlertType} from './modules';
import {Alert} from './modules';

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

  alert: Alert = new Alert (
    AlertType.SUCCESS,
    '',
    '',
    1000
  );

  animation = 'fancy';
  align = 1;
  htmlTextEnabled = false;

  constructor(
    private _personService: PersonService,
    private alertCenterService: AlertCenterService
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

          if (response.message == 'La Persona se ha creado correctamente') {
            this.alert.alertType = 0;
            this.alert.textStrong = 'Suscripción: ';
            this.alert.text = response.message;
            this.alert.autoDismissTime = 2500;
            this.alert.dismissable = true;
            this.sendAlert();
          }else {
            this.alert.alertType = 2;
            this.alert.textStrong = 'Suscripción: ';
            this.alert.text = response.message;
            this.alert.autoDismissTime = 2500;
            this.alert.dismissable = true;
            this.sendAlert();
          }

        }else {
          console.log(response);
          this.message = response.message;

          this.alert.alertType = 3;
          this.alert.text = 'Suscripción';
          this.alert.textStrong = response.message;
          this.alert.autoDismissTime = 1000;
          this.alert.dismissable = true;
          this.sendAlert();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  sendAlert() {
    this.alert = new Alert (
      this.alert.alertType,
      this.alert.text,
      this.alert.textStrong,
      this.alert.autoDismissTime,
      this.alert.dismissable
    );
    this.alertCenterService.alert(this.alert);
  }

  getLeft() {
    switch (this.align) {
      case 0:
        return '0';
      case 1:
        return '20%';
      case 2:
        return '60%';
    }
  }

  getRight() {
    switch (this.align) {
      case 0:
        return '60%';
      case 1:
        return '20%';
      case 2:
        return '0';
    }
  }
}
