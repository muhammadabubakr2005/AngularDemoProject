import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user-interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.name === username && u.password === password);
        return user || null;
      })
    );
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }
  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users: User[]) =>
        users.filter(user =>
          !user.isDeleted && (
            user.name.toLowerCase().includes(query.toLowerCase()) 
            // user.email.toLowerCase().includes(query.toLowerCase()) ||
            // user.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
          )
        )
      )
    );
  }

  getLargestId(): Observable<number> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users: User[]): number => {
        if (!users.length) return 0;

        const numericIds = users
          .map((user: User) => parseInt(user.id))
          .filter(id => !isNaN(id));

        if (!numericIds.length) return 0;

        return Math.max(...numericIds);
      })
    );
  }
}
