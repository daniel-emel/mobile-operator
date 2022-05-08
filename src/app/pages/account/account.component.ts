import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router} from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('user') as string));
    let id = JSON.parse(localStorage.getItem('user') as string).uid;
    console.log(id);
    this.userService.getById(id).subscribe(user => {this.user = user!; console.log(user)});
  }

  deleteUser() {
    this.userService.delete(JSON.parse(localStorage.getItem('user')!).uid);
    this.router.navigateByUrl('/home');
  }

}
