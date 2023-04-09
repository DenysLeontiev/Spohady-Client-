import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}; // for logging in
  currentUser$: Observable<User | null> = of(null);

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe((response) => {
      this.toastr.success("Ласкаво просимо");
      console.log(response);
    }, error => {
      this.toastr.error(error.error);
      this.toastr.error("Сталася помилка");
      console.log(error);
    })
  }

  logout() {
    this.accountService.logout();
  }
}
