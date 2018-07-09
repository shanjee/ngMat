import { Injectable, Query } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, fromEventPattern } from 'rxjs';
import { map } from "rxjs/operators";




@Injectable({
  providedIn: 'root'
})
export class GaugeService {

  users: Observable<any[]>;
  lastUser:any;
  // constructor() {}
  constructor(public db: AngularFireDatabase) {
    // console.log("GaugeService is calling");
    // this.items = db.list('items').valueChanges();

    this.users = db.list('items').snapshotChanges().pipe(map(
      changes => { return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) }));

    // this.lastUser = db.list('items').valueChanges().subscribe(details => console.log(details[details.length-1]))
     this.lastUser = db.list('items', ref => ref.limitToLast(1));
     
     
  }

  getCurrentSpeed() {

    this.users.forEach(element => {
      console.log(element[element.length - 1].content);
      
    });   
    
    return this.users;
  }
}
