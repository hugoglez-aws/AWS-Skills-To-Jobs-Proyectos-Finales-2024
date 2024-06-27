import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/user/userDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  userProfile: UserDTO | null = null;

  constructor(private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userId = JSON.parse(sessionStorage.getItem("user")!).ID_user;
    this.userService.getUserById(userId).subscribe({
      next: (response: UserDTO) => {
        this.userProfile = response;
        console.log(response)
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  signOut() {
    this.authService.signOut();
  }

  userProfileModal(): void {
    const modalElement = document.getElementById('userProfileModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}

