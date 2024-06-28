import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';
import { DefaultProfileService } from 'src/app/services/staticImages/default-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string | null = "";
  plenaInclusionLogo: string = "";

  constructor(private authService: AuthService,
    private router: Router,
    private defaultProfileService: DefaultProfileService,
  ) { }

  ngOnInit(): void {
    this.getRole();
    this.getLogo();
  }

  getLogo(): void {
    this.defaultProfileService.getPlenaInclusionLogo().subscribe({
      next: (imageUrl: string) => {
        console.log(imageUrl)
        this.plenaInclusionLogo = imageUrl;
      },
      error: (error: any) => {
        console.error('Error al obtener la imagen predeterminada:', error);
      }
    });
  }

  getRole() {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
  }

  navigateToListSchedules() {
    this.router.navigate(['/schedules']);
  }

  navigateToUserSchedules() {
    this.router.navigate(['/userSchedules']);
  }

  navigateToListHome() {
    this.router.navigate(['/home']);
  }

  navigateToUserList() {
    this.router.navigate(['/manageU']);
  }

  navigateToManageA() {
    this.router.navigate(['/manageA']);
  }

  navigateToManageC() {
    this.router.navigate(['/manageC']);
  }

  navigateToManageT() {
    this.router.navigate(['/manageT']);
  }

}
