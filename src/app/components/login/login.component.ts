import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userName: string = '';
  private userPassword: string = '';
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router : Router
  ) { }
  loginForm = new FormGroup({
    name: new FormControl(this.userName, [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl(this.userPassword, [
      Validators.required,
      Validators.minLength(6),
    ])
  });
  onSubmit() {
    if (this.loginForm.valid) {
      this.userName = this.loginForm.value.name as string;
      this.userPassword = this.loginForm.value.password as string;
      this.userService.login(this.userName, this.userPassword).subscribe(
        {
          next: (user) => {
            if (user && user.isDeleted === false) {
              console.log('Login successful', user);
              this.authService.setUser(user);
              this.router.navigate(['/home']  );
            } else {
              alert('Invalid username or password');
            }
          },
          error: (err) => {
            console.error('Login failed', err);
            alert('Login failed. Please try again.');
          }
        }
      );
    }
  }
}
