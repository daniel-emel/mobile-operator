import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{

  title = 'mobile-operator';
  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      localStorage.setItem('user', JSON.stringify('null'));
    })
  }
  
  logout(){
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/home');
      console.log('Logged out successfully.');
    }).catch(error => {
      console.log(error);
    })
  }
}
