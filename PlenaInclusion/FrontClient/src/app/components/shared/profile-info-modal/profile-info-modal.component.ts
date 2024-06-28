import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDTO } from 'src/app/models/user/userDTO';
import { UserService } from 'src/app/services/user/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-profile-info-modal',
  templateUrl: './profile-info-modal.component.html',
  styleUrls: ['./profile-info-modal.component.css']
})
export class ProfileInfoModalComponent {

  @Input() selectedUser: UserDTO | null = null;
  @Output() userDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UserService) { }

  deleteUser() {
    this.userService.deleteUser(this.selectedUser?.ID_user!).subscribe({
      complete: () => {
        this.openAdviceModal();
        this.userDeleted.emit();
      }
    })
  }

  openAdviceModal() {
    const modalElement = document.getElementById('adviceConfirmation');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


}
