import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDTO } from 'src/app/models/user/userDTO';

declare var bootstrap: any;

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input() user: UserDTO | null = null;
  @Output() userClicked = new EventEmitter<UserDTO>();

  onCardClick(): void {
    if (this.user) {
      this.userClicked.emit(this.user);
    }
  }


}
