import { Injectable, Query } from '@angular/core';

// import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, fromEventPattern } from 'rxjs';
import { map } from "rxjs/operators";
import { SpeedoMeter } from "../Component/Model/speedo-meter"



@Injectable({
  providedIn: 'root'
})
export class GaugeService {

  // speedoMeter: Observable<any[]>;
  lastUser: any;
  speedoMeter: AngularFireList<any>;

  itemsRef: AngularFireList<SpeedoMeter>;
  items: Observable<SpeedoMeter[]>;
  dbPath = "/items";


  // constructor(public db: AngularFireDatabase) {
  //   // console.log("GaugeService is calling");
  //   // this.items = db.list('items').valueChanges();

  //   this.speedoMeter = db.list('items').snapshotChanges().pipe(map(
  //     changes => { return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) }));
  // }

  // constructor(public db: AngularFireDatabase) {
  //   this.speedoMeter = db.list('/items', ref => ref.orderByKey().limitToLast(2));
  // }

  constructor(public db: AngularFireDatabase) {
    // this.itemsRef = db.list('items');
    this.itemsRef = db.list(this.dbPath, ref => ref.orderByKey().limitToLast(100));

    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getAllSpeedometer(): Observable<SpeedoMeter[]> {
    console.log("getAllSpeedometer");

    return this.items;
  }

  createSpeedometer(speedoMeter: SpeedoMeter): void {
    this.db.list(this.dbPath).push(speedoMeter);//.catch(error => this.handleError(error));
  }

  deleteByKey(key: string): void {
    this.db.list(this.dbPath).remove(key).catch(error => this.handleError(error));
  }

  deleteAll(): void {
    // this.db.list('items').remove().catch(error => this.handleError(error));
    this.itemsRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }

  getCurrentSpeed() {
    // this.speedoMeter.forEach(element => {
    //   console.log(element[element.length - 1].content);
    // });

    return this.speedoMeter;
  }
}
