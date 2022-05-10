import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserSubscription } from '../models/UserSubscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  collectionName = "subscriptions";

  constructor(private afs: AngularFirestore) { }

  create (userId: string, userSubscription: UserSubscription) {
    return this.afs.collection<UserSubscription>(this.collectionName).doc(userId).set(userSubscription);
  }

  getbyId(userId: string) {
    return this.afs.collection<UserSubscription>(this.collectionName).doc(userId).valueChanges();
  }

  update(userId: string, userSubscription: UserSubscription) {
    return this.afs.collection<UserSubscription>(this.collectionName).doc(userId).set(userSubscription);  }

  delete(userId: string) {
    return this.afs.collection<UserSubscription>(this.collectionName).doc(userId).delete();
  }


}
