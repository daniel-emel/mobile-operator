import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { getAuth, deleteUser } from "firebase/auth";
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName: string = 'users';

  constructor(private afs: AngularFirestore) { }

  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getById(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(user: User) {
    return this.afs.collection(this.collectionName).doc(user.id).set(user);
  }

  async delete(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).delete().then(async _ => {
      const auth = getAuth();
      const user = auth.currentUser;
      await deleteUser(user!).then().catch(_ => {
        console.log("Error when deleting user!");
      });
    }).catch(_ => {
      console.log('Error when deleting user!');
    });
  }
}
