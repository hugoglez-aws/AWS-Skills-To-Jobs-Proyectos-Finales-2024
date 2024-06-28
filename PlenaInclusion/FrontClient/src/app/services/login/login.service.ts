import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loginUserDTO } from 'src/app/models/user/loginUserDTO';
import { environments } from 'src/environments/environments';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = environments.baseUrl;

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  loginUser(user: loginUserDTO): Observable<any> {
    const formData = new FormData();
    formData.append('Email', user.Email);
    formData.append('Pass', user.Pass);
    return this.http.post<any>(`${this.url}/api/auth/login`, formData).pipe(
      tap(response => {
        const userRole = response.data.user.Rol;
        this.authService.setRole(userRole);
      })
    );
  }

  googleLogin(user: any) {
    const generateRandomNineDigitNumber = () => {
      const min = 100000000;
      const max = 999999999;
      return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    };

    const body = {
      DNI: generateRandomNineDigitNumber(),
      Email: user.email,
      Name: user.given_name,
      Surname_1: user.family_name,
      Surname_2: '',
      Photo: user.picture,
      Rol: 'Nominal',
      Adress: '',
      Phone: '',
      DNI_tutor: ''
    };

    return this.http.post<any>(`${this.url}/api/auth/googleLogin`, body).pipe(
      tap(response => {
        const userRole = response.user.Rol;
        this.authService.setRole(userRole);
      })
    );
  }

}
