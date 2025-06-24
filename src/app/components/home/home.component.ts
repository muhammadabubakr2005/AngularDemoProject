import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { User } from '../../interfaces/user-interface';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected user: User | null = null;
  constructor(private authService:AuthService, private router:Router) {}
  ngOnInit(){
    this.user = this.authService.getUser();
    console.log('User in Home Component:', this.user);
  }
  logout() {
    this.authService.clearUser();
    this.router.navigate(['/login']);
  }
  
}
