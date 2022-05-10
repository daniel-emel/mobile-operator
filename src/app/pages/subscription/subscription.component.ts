import { Component, OnInit } from '@angular/core';
import { UserSubscription } from 'src/app/shared/models/UserSubscription';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass']
})
export class SubscriptionComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  userSubs!: UserSubscription;
  userId!: string;
  
  constructor(private subService: SubscriptionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      if (user) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    }, error => {
      this.isUserLoggedIn = false;
    });
    console.log(JSON.parse(localStorage.getItem('user') as string))
    this.userId = JSON.parse(localStorage.getItem('user') as string).uid;
    console.log(this.userId);
    this.getUserSubs(this.userId);
  }

  async getUserSubs(userId: string) {
    await this.subService.getbyId(this.userId).subscribe(subs => subs?this.userSubs=subs:this.userSubs = {subscriptions: []});
    console.log(this.userSubs.subscriptions);
  }

  async buySub(subName: string) {
    this.userSubs.subscriptions.push(subName);
    await this.subService.create(this.userId, this.userSubs);
    
    await this.getUserSubs(this.userId);
    console.log(this.userSubs.subscriptions);
  }

  async unSub(subName: string) {
    this.userSubs.subscriptions = this.userSubs.subscriptions.filter(element => ![subName].includes(element));
    await this.userSubs.subscriptions.length === 0 ? this.subService.delete(this.userId) : this.subService.update(this.userId, this.userSubs);
    await this.getUserSubs(this.userId);
  }

}
