import { Component, EventEmitter, Input, Output } from '@angular/core';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';

@Component({
  selector: 'app-user-schedule-card',
  templateUrl: './user-schedule-card.component.html',
  styleUrls: ['./user-schedule-card.component.css']
})
export class UserScheduleCardComponent {
  @Input() userSchedule: userScheduleDTO | null = null;
  @Output() userScehduleClicked = new EventEmitter<userScheduleDTO>();

  onCardClick(): void {
    if (this.userSchedule) {
      this.userScehduleClicked.emit(this.userSchedule);
    }
  }
}
