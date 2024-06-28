import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { UserDTO } from 'src/app/models/user/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.url}/api/users`);
  }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.url}/api/users/${userId}`);
  }

  updateUser(user: UserDTO, file: File): Observable<UserDTO> {
    const formData = new FormData();
    formData.append('DNI', user.DNI!);
    formData.append('Adress', user.Adress!);
    formData.append('DNI_tutor', user.DNI_tutor!);
    formData.append('Phone', user.Phone!);
    formData.append('Surname_2', user.Surname_2!);
    formData.append('BirthDay', user.BirthDay!);

    if (file) {
      formData.append('Photo', file);
    }
    return this.http.put<UserDTO>(`${this.url}/api/users/${user.ID_user}`, formData);
  }

  deleteUser(userId: string): Observable<UserDTO> {
    return this.http.delete<UserDTO>(`${this.url}/api/users/${userId}`);
  }
}
