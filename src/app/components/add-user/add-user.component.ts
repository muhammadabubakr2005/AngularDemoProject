import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user-interface';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from "../header/header.component";
var tempID = 4;
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  protected currentUser: User | null = null;
  private user:User = {
    id: '',
    name: '',
    email: '',
    password: '',
    isDeleted: false,
    role: '',
    skills: [],

  };
  constructor(private userService: UserService, private fb: FormBuilder, private auth:AuthService){}
  addUserForm = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    role: this.fb.control('', [Validators.required]),
    skills: this.fb.array([this.fb.control('')])
  });

  get skills() {
    return this.addUserForm.get('skills') as FormArray;
  }
  addSkill() {
    this.skills.push(this.fb.control(''));
  }
  ngOnInit() {
    this.currentUser = this.auth.getUser();
    this.userService.getLargestId().subscribe({
      next: (largestId: number) => {
        console.log('Largest ID fetched:', largestId);
        tempID = (largestId + 1);
      },
      error: (err: any) => {
        console.error('Error fetching largest ID:', err);
        tempID = 1;
      }
    });
  }
  onSubmit(){
    if (this.addUserForm.valid) {
      const formValue = this.addUserForm.value;
      this.user = {
        id: (tempID++).toString(),
        name: formValue.name ?? '',
        email: formValue.email ?? '',
        password: formValue.password ?? '',
        role: formValue.role ?? '',
        isDeleted: false,
        skills: (formValue.skills ?? []).filter((skill): skill is string => skill !== null)
      };
      this.userService.createUser(this.user).subscribe({
        next: () => {
          console.log('User added successfully:', this.user);
          this.addUserForm.reset();
        },
        error: (err: any) => {
          console.error('Error adding user:', err);
        }
      });
    } 
  }
}
