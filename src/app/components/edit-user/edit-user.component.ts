import { Component } from '@angular/core';
import { User } from '../../interfaces/user-interface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  protected currentUser: User | null = null;
  protected user: User | null = null;
  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder, private auth:AuthService) { }
  editUserForm = this.fb.group({
    name: this.fb.control(this.user?.name || '', [Validators.required, Validators.minLength(4)]),
    email: this.fb.control(this.user?.email || '', [Validators.required, Validators.email]),
    password: this.fb.control(this.user?.password || '', [Validators.required, Validators.minLength(6)]),
    role: this.fb.control(this.user?.role || '', [Validators.required]),
    skills: this.fb.array(this.user?.skills || [])
  });
  get skills() {
    return this.editUserForm.get('skills') as FormArray;
  }
  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  ngOnInit() {
    this.currentUser = this.auth.getUser();
    const userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(userId?.toString() || '').subscribe({
      next: (user) => {
        this.user = user;
        console.log('User details:', user);

          this.editUserForm.patchValue({
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        });

        // Clear and repopulate the skills FormArray
        this.skills.clear();
        user.skills.forEach(skill => {
          this.skills.push(this.fb.control(skill));
        });
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }

  onSubmit() {
    if (this.editUserForm.valid && this.user) {
      const formValue = this.editUserForm.value;
      const updatedUser: User = {
        ...this.user,
        name: formValue.name || '',
        email: formValue.email || '',
        password: formValue.password || '',
        role: formValue.role || '',
        skills: (formValue.skills || []).filter((skill): skill is string => skill !== null)
      };
      this.userService.updateUser(this.user.id, updatedUser).subscribe({
        next: () => {
          console.log('User updated successfully:', updatedUser);
        },
        error: (err) => {
          console.error('Error updating user:', err); 
        }
      });
    }
  }

}
