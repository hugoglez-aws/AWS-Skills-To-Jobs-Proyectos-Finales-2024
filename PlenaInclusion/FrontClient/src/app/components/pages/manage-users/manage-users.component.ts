import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/user/userDTO';
import { DefaultProfileService } from 'src/app/services/staticImages/default-profile.service';
import { UserService } from 'src/app/services/user/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: UserDTO[] = [];
  selectedUser: UserDTO | null = null;

  plenaInlcusionLogo: string = "";

  constructor(private userService: UserService,
    private router: Router,
    private defaultProfileService: DefaultProfileService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getLogo();
  }

  getLogo(): void {
    this.defaultProfileService.getDefaultPlenaInclusionLogoImage().subscribe({
      next: (imageUrl: string) => {
        this.plenaInlcusionLogo = imageUrl;
      },
      error: (error: any) => {
        console.error('Error al obtener la imagen predeterminada:', error);
      },
      complete: () => {
        this.showInitialToast()
      }
    });
  }

  showInitialToast() {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = new bootstrap.Toast(toastLiveExample, {
      autohide: false
    })
    toastBootstrap.show()
  }


  getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: UserDTO[]) => {
        this.users = response;
        console.log(this.users)

      },
      error: () => {
      }
    })
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onUserClicked(user: UserDTO): void {
    this.selectedUser = user;
    const modalElement = document.getElementById('userInfoModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
