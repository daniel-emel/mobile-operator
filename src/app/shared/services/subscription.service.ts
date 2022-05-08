import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private afs: AngularFirestore) { }

  createSubscription (usedId: string, subscriptionId: string) {

  }

  getSubscriptionsbyUserId(userId: string) {

  }

  updateSubscription(userId: string, subscriptionId: string) {

  }

  deleteSubscription(userId: string, subscriptionId: string) {

  }


}
