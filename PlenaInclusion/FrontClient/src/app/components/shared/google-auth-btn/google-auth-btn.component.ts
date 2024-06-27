import { AUTO_STYLE } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';
import { environments } from 'src/environments/environments';
declare var google: any;
@Component({
  selector: 'app-google-auth-btn',
  templateUrl: './google-auth-btn.component.html',
  styleUrls: ['./google-auth-btn.component.css']
})
export class GoogleAuthBtnComponent implements OnInit, OnDestroy {

  client_id: string = environments.client_id;
  intervalId: any;

  constructor(private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGoogleApi();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private loadGoogleApi(): void {
    this.intervalId = setInterval(() => {
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        clearInterval(this.intervalId);
        this.initializeGoogleButton();
      }
    }, 100);
  }

  private initializeGoogleButton(): void {
    google.accounts.id.initialize({
      client_id: this.client_id,
      callback: (response: any) => {
        this.handleLoggin(response.credential);
      }
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: AUTO_STYLE
      }
    );

    google.accounts.id.disableAutoSelect();
  }

  private decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  handleLoggin(credential: any) {
    if (credential) {
      const payload = this.decodeToken(credential);
      this.loginService.googleLogin(payload).subscribe({
        next: (response: any) => {
          sessionStorage.setItem("user", JSON.stringify(response.user));
          sessionStorage.setItem("token", response.token);
          this.authService.setRole(response.user.Rol);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.router.navigate(['home']);
        }
      });
    }
  }

}
