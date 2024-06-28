import { Component, EventEmitter, Input, Output } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
import { UserScheduleService } from 'src/app/services/userSchedule/user-schedule.service';
import { getWeeklyAttendanceDates } from '../../../../utils/getWeeklyAttendanceDates';
import { AllSchedulesService } from 'src/app/services/schedules/listSchedules/all-schedules.service';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';

declare var bootstrap: any;

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.component.html',
  styleUrls: ['./schedule-modal.component.css']
})
export class ScheduleModalComponent {
  @Input() schedule: scheduleDTO | null = null;
  @Output() handleScheduleRegistered: EventEmitter<void> = new EventEmitter<void>();
  @Input() isUserRegistered: boolean = false;
  @Output() scheduleChange: EventEmitter<void> = new EventEmitter<void>();

  role: string | null = sessionStorage.getItem("Rol");

  fechas: string[] = [];
  userSchedules: userScheduleDTO[] = [];

  media: number = 0;
  adviceTitle: string = "";

  constructor(private userScheduleService: UserScheduleService,
    private scheduleService: AllSchedulesService
  ) { }


  getCommentsbyScheduleId() {
    this.userScheduleService.listScheduleBySchedule(this.schedule?.ID_Schedule!).subscribe({
      next: (response: userScheduleDTO[]) => {
        console.log(response);
        this.userSchedules = response.filter(userSchedule => userSchedule.Comment && userSchedule.Comment.trim().length > 0);
        this.media = this.mediaScore();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  mediaScore() {
    if (this.userSchedules.length > 0) {
      const totalScore = this.userSchedules.reduce((sum, userSchedule) => sum + userSchedule.Rating, 0);
      const averageScore = totalScore / this.userSchedules.length;
      return averageScore;
    } else {
      console.log('No hay comentarios para calcular la nota media.');
      return 0;
    }
  }




  deleteForSchedule() {
    if (this.schedule) {
      const userId = JSON.parse(sessionStorage.getItem("user")!).ID_user;
      if (userId) {
        const scheduleId = this.schedule.ID_Schedule;
        this.deleteRegistation();
        this.decrementAttendance(scheduleId!);
      } else {
        console.error('ID de usuario no encontrado en el sesionStorage');
      }
    } else {
      console.error('No hay schedule seleccionado');
    }
  }

  registerForSchedule() {
    if (this.schedule) {
      const userId = JSON.parse(sessionStorage.getItem("user")!).ID_user;
      if (userId) {
        const scheduleId = this.schedule.ID_Schedule;
        this.calcularFechas();
        for (const date of this.fechas) {
          this.launchInsertion(userId, scheduleId!, date)
        }
        this.incrementAttendance(scheduleId!);
        this.sendEmail();
      } else {
        console.error('ID de usuario no encontrado en el sesionStorage');
      }
    } else {
      console.error('No hay schedule seleccionado');
    }
    this.fechas = [];

  }

  sendEmail() {
    this.scheduleService.sendRecorderEmail(this.schedule?.Activity?.Name!, this.schedule?.StartHour!, this.schedule?.Address!, this.schedule?.DayOfWeek!, this.fechas).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  incrementAttendance(scheduleId: string): void {
    this.scheduleService.incrementAttendace(scheduleId).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error('Error en el registro', error);
      }

    })
  }

  decrementAttendance(scheduleId: string): void {
    this.scheduleService.decrementAttendace(scheduleId).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error('Error en el registro', error);
      }
    })
  }


  deleteRegistation(): void {
    const userid = JSON.parse(sessionStorage.getItem("user")!).ID_user;
    this.userScheduleService.deleteRegistation(userid!, this.schedule?.ID_Schedule!).subscribe({
      next: response => {
        console.log('Borrado exitoso', response);
      },
      error: error => {
        console.error('Error en el borrado', error);
      },
      complete: () => {
        this.scheduleChange.emit();
      }
    })
  }

  launchInsertion(userId: string, scheduleId: string, date: string) {
    this.userScheduleService.postSchedule(userId, scheduleId, date).subscribe({
      next: response => {
        console.log('Registro exitoso', response);
      },
      error: error => {
        console.error('Error en el registro', error);
      },
      complete: () => {
        this.scheduleChange.emit();
      }
    });
  }

  calcularFechas() {
    if (this.schedule && this.schedule.Frequency === "Semanal") {
      this.fechas = getWeeklyAttendanceDates(this.schedule.StartDate, this.schedule.FinishDate);
    } else {
      this.fechas.push(new Date(this.schedule?.StartDate!).toISOString().split('T')[0]);
    }
  }

  confirmRegistration(): void {
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      const modal = bootstrap.Modal.getInstance(confirmModal);
      if (modal) {
        modal.hide();
      }
    }
    this.registerForSchedule();
  }


  confirmDeletion(): void {
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
      const modal = bootstrap.Modal.getInstance(deleteModal);
      if (modal) {
        modal.hide();
      }
    }
    this.deleteForSchedule();
  }

  viewComments(): void {
    this.getCommentsbyScheduleId();
    const modalElement = document.getElementById('commentModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteSchedule(): void {
    this.scheduleService.deleteSchedule(this.schedule?.ID_Schedule!).subscribe({
      next: () => {
        this.adviceTitle = "Horario borrado corectamente"
      },
      error: () => {
        this.adviceTitle = "Existen usuarios asignados a este horario, de momento no se puede borrar."
        this.openAdviceModal();
      },
      complete: () => {
        this.openAdviceModal();
        this.scheduleChange.emit();
      }
    })
  }

  openAdviceModal() {
    const modalElement = document.getElementById('adviceScheduleEliminationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
