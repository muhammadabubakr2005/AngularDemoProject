import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user-interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  protected currentUser: User|null = null;
  protected user:User|null = null;
  constructor(private route: ActivatedRoute, private userService: UserService, private auth:AuthService) {}
  ngOnInit() {
    this.currentUser = this.auth.getUser();
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(userId?.toString()||'').subscribe({
      next: (user) => {
        this.user = user;
        console.log('User details:', user);
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
}
