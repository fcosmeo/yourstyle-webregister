import { Component, OnInit } from '@angular/core';
import {AlertCenterService} from 'ng2-alert-center';
import {AlertType} from 'ng2-alert-center';
import {Alert} from 'ng2-alert-center';

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

  alert: Alert = new Alert (AlertType.SUCCESS, '', '', 2500);

  animation = 'fancy';
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
    /*console.log(this.person);*/
    this.saveProducto();
  }

  saveProducto() {
    this._personService.addPerson(this.person).subscribe(
      response => {
        if (response.code == 200) {
          this.person = new Person(0, '', '', '', null, '', '', 1);
          /*console.log(response);*/

          if (response.message == 'La Persona se ha creado correctamente') {
            this.sendAlert(0, 'Registro Exitoso', 'Suscripción: ', 2500, true);
          }else {
            this.sendAlert(2, response.message, 'Suscripción: ', 2500, true);
          }

        }else {
          console.log(response);
          this.sendAlert(3, response.message, 'Suscripción: ', 2500, true);
        }
      },
      error => {
        console.log(<any>error);
        this.sendAlert(3, <any>error, 'Suscripción: ', 2500, true);
      }
    );
  }

  sendAlert(alertType, text, textStrong, autoDismissTime, dismissable) {
    this.alert = new Alert ( alertType, text, textStrong, autoDismissTime, dismissable);
    this.alertCenterService.alert(this.alert);
  }
}
