import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  error = '';

  constructor(private router: Router, private userState: UserStateService) { }

  ngOnInit() {
  }

  submit() {
    this.userState.login(this.form.value).subscribe(() => this.router.navigate(['home']));
  }


}
