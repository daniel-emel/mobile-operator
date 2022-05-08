import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router} from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  user!: User;
  isEditing: boolean = false;


  updateForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    let id = JSON.parse(localStorage.getItem('user') as string).uid;
    this.userService.getById(id).subscribe(user => {this.user = user!;});
    console.log(this.user);
  }

  deleteUser() {
    this.userService.delete(JSON.parse(localStorage.getItem('user')!).uid);
    this.router.navigateByUrl('/home');
  }

  updateUser() {
    if (!this.isEditing) {
      this.isEditing = true;
    } else {
      this.userService.update(this.user);
      this.isEditing = false;
    }
  }

}
