import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';
import { UserScheduleService } from 'src/app/services/userSchedule/user-schedule.service';

@Component({
  selector: 'app-user-schedule-modal',
  templateUrl: './user-schedule-modal.component.html',
  styleUrls: ['./user-schedule-modal.component.css']
})
export class UserScheduleModalComponent {
  @Input() userSchedule: userScheduleDTO | null = null;
  @Output() scheduleChange: EventEmitter<userScheduleDTO> = new EventEmitter<userScheduleDTO>();

  constructor(private userScheduleService: UserScheduleService) { }

  isValid(): boolean {
    return this.userSchedule != null &&
      this.userSchedule.Rating >= 0 &&
      this.userSchedule.Rating <= 10 &&
      this.userSchedule.Comment.trim().length > 0;
  }

  saveChanges(): void {
    if (this.userSchedule && this.isValid()) {
      this.userScheduleService.rateUserSchedule(this.userSchedule.ID, this.userSchedule.Rating, this.userSchedule.Comment)
        .subscribe({
          next: (updatedSchedule) => {
            console.log(updatedSchedule)
            this.scheduleChange.emit();
          },
          error: (error) => {
            console.error('Error updating schedule:', error);
          }
        });
    }
  }
}
