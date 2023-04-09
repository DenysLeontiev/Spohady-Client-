import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe((response) => {
      this.toastr.success("Ви зареєстровані");
      console.log(response);
    }, error => {
      this.toastr.error("Помилка під час реєстрування");
    })
  }
}
