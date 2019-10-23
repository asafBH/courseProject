import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStateService } from '../../services/user-state.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),
  });

  error = '';

  constructor(private router: Router, private userState: UserStateService) { }

  ngOnInit() {
  }
  
  submit() {
    // this.userLogService.logIn(this.form.value.username, this.form.value.password).subscribe(user => {
    //   this.router.navigate(['home']);
    // },
    //   err => { this.error = err });

    // return false;
    this.userState.register(this.form.value).subscribe(() => this.router.navigate(['home']));
  }

}

