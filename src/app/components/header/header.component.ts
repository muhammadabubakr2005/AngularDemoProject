import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  UserRole: string = '';
  @Input() userRole: string = '';
  ngOnInit() {
    this.UserRole = this.userRole;
    console.log('User Role:', this.UserRole);
  }
}
