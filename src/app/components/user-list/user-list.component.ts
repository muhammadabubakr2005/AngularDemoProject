import { Component } from '@angular/core';
import { User } from '../../interfaces/user-interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule, HeaderComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  protected currentUser: User | null = null;
  protected users: User[]=[];
  protected searchTerm: string = '';
  protected currentPage: number = 1;
  protected pageSize: number = 5;
  protected paginatedUsers: User[] = []
  math = Math;
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    
  ) {}
  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.loadUsers();
    console.log('Paginated users:', this.paginatedUsers);
  }
  // ngOnChanges() {
  //   this.loadUsers();
  // }
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.paginatedUsers = this.getPaginatedUsers();
        console.log('Users loaded:', this.users);
      },
      error: (err: any) => {
        console.error('Error loading users:', err);
      }
    });
  }

  getPaginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginatedUsers = this.getPaginatedUsers();
  }
  viewUser(user: User) {
    this.router.navigate(['/view-user', user.id]);
  }
  deleteUser(user: User) {
    user.isDeleted = true; 
    this.userService.updateUser(user.id, user).subscribe({
      next: () => {
        console.log('User deleted:', user.id);
        // this.loadUsers();
        this.users = this.users.filter(u => u.id !== user.id);
        const totalPages = Math.ceil(this.users.length / this.pageSize);
        if (this.currentPage > totalPages) {
          this.currentPage = totalPages;
        }
        this.paginatedUsers = this.getPaginatedUsers();
        },
      error: (err: any) => {
        console.error('Error deleting user:', err);
      }
    });
  }
  editUser(user:User){
    this.router.navigate(['/edit-user', user.id]);
  }
  
  onSearch(searchTerm: string) {
    if (searchTerm) {
      this.userService.searchUsers(searchTerm).subscribe({
        next: (users: User[]) => {
          this.users = users;
          this.paginatedUsers = users;
          console.log('Search results:', this.users);
        },
        error: (err: any) => {
          console.error('Error searching users:', err);
        }
      });
    } else {
      this.loadUsers();
    }
  }
}
