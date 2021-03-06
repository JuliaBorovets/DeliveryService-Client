import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string;

  constructor(private userService: UserService, private router: Router, public translate: TranslateService) {
  }

  ngOnInit(): void {
    if (this.userService.currentUserValue) {
      this.router.navigate(['/home']);
      return;
    }
  }

  login() {
    this.userService.login(this.user).subscribe(data => {
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.translate.instant('ERROR_MESSAGES.USERNAME_PASSWORD');
    });
  }
}
