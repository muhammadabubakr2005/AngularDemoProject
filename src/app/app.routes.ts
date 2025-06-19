import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { TrashListComponent } from './components/trash-list/trash-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { authGuard, loginGuard } from './services/auth-guard.service';
export const routes: Routes = [
    {path: '',redirectTo: 'login', pathMatch: 'full'},
    {path: 'login',component: LoginComponent, canActivate: [loginGuard]},
    {path: 'home',component: HomeComponent, canActivate: [authGuard]},
    {path: 'users',component: UserListComponent, canActivate: [authGuard]},
    {path: 'view-user/:id', component: ViewUserComponent, canActivate: [authGuard]},
    {path: 'add-user',component: AddUserComponent, canActivate: [authGuard]},
    {path: 'edit-user/:id', component: EditUserComponent, canActivate: [authGuard]},
    {path: 'trash', component: TrashListComponent, canActivate: [authGuard]}
];
