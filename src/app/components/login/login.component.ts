import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    
   }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm?.value.email;
    const password = this.loginForm?.value.password;

    if(username === 'admin@email.com' && password === 'admin') {
      localStorage.setItem('userSession', JSON.stringify({username}));
      this.router.navigateByUrl('/weather');
      
      
    }
  }
}
