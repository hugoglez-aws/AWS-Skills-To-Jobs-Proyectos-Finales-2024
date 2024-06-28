import { Component, Input, OnInit } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';
import { UserScheduleService } from 'src/app/services/userSchedule/user-schedule.service';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css']
})
export class ViewCommentsComponent {

  @Input() selectedSchedule: scheduleDTO | null = null;
  userSchedules: userScheduleDTO[] = [];

  constructor(private userScheduleService: UserScheduleService) { }

  getCommentsbyScheduleId() {
    this.userScheduleService.listScheduleBySchedule(this.selectedSchedule?.ID_Schedule!).subscribe({
      next: (response: userScheduleDTO[]) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

}
