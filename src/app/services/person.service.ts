import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Person } from '../models/person';
import { GLOBAL } from './global';

@Injectable()
export class PersonService {
  public url: string;

  constructor(
    public _http: Http
  ) {
    this.url = GLOBAL.url;
  }

  getPeople(){
    return this._http.get(this.url + 'people').map(res => res.json());
  }

  getPerson(email) {
    return this._http.get(this.url + 'person/' + email).map(res => res.json());
  }

  addPerson(person: Person) {
    let json = JSON.stringify(person);
    console.log(json);
    let params = 'json=' + json;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this._http.post(this.url + 'people', params, {headers: headers})
      .map(res => res.json());
  }
}
