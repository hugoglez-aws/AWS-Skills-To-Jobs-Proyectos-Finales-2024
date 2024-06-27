import { Component, Input, Output, EventEmitter } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.css']
})
export class ScheduleCardComponent {
  @Input() schedule: scheduleDTO | null = null;
  @Output() scheduleClicked = new EventEmitter<scheduleDTO>();
  @Input() isUserRegistered: boolean = false;

  date: Date = new Date();

  onCardClick(): void {
    if (this.schedule) {
      this.scheduleClicked.emit(this.schedule);
    }
  }
}
