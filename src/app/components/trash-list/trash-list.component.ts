import { Component } from '@angular/core';
import { User } from '../../interfaces/user-interface';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-trash-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './trash-list.component.html',
  styleUrl: './trash-list.component.css'
})
export class TrashListComponent {
  protected user: User | null = null;
    protected users: User[]=[];
    constructor(
      private userService: UserService,
      private router: Router,
      private authService: AuthService
    ) {}
    ngOnInit() {
      this.user=this.authService.getUser();
      this.loadUsers();
    }
    loadUsers() {
      this.userService.getUsers().subscribe({
        next: (users: User[]) => {
          this.users = users;
          console.log('Users loaded:', this.users);
        },
        error: (err: any) => {
          console.error('Error loading users:', err);
        }
      });
    }
    viewUser(user: User) {
      this.router.navigate(['/view-user', user.id]);
    }
}
