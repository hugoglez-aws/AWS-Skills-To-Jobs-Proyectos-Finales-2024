import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';

@Injectable({
  providedIn: 'root'
})
export class AllSchedulesService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  listAllSchedules(): Observable<scheduleDTO[]> {
    return this.http.get<scheduleDTO[]>(`${this.url}/api/schedules`);
  }

  incrementAttendace(scheduleId: string): Observable<any> {
    return this.http.post<any>(`${this.url}/api/schedules/${scheduleId}/increment`, null)
  }

  decrementAttendace(scheduleId: string): Observable<any> {
    return this.http.post<any>(`${this.url}/api/schedules/${scheduleId}/decrement`, null)
  }

  postSchedule(schedule: scheduleDTO): Observable<scheduleDTO> {
    const formData = new FormData();

    formData.append('Address', schedule.Address);
    formData.append('DayOfWeek', schedule.DayOfWeek);
    formData.append('StartHour', schedule.StartHour);
    formData.append('FinishHour', schedule.FinishHour);
    formData.append('Frequency', schedule.Frequency);
    formData.append('StartDate', schedule.StartDate.toString());
    if (schedule.Frequency == "Semanal") {
      formData.append('FinishDate', schedule.FinishDate.toString());
    }
    formData.append('Capacity', schedule.Capacity.toString());
    formData.append('Attendance', schedule.Attendance.toString());
    formData.append('ID_Activity', schedule.ID_Activity);
    formData.append('ID_Type', schedule.ID_Type);
    formData.append('ID_Campaign', schedule.ID_Campaign!);

    return this.http.post<scheduleDTO>(`${this.url}/api/schedules`, formData)
  }

  deleteSchedule(idSchedule: string) {
    return this.http.delete<scheduleDTO>(`${this.url}/api/schedules/${idSchedule}`);
  }

  sendRecorderEmail(scheduleName: string, scheduleTime: string, scheduleAdress: string, scheduleDay: string, dates: string[]): Observable<any> {
    const body = {
      name: scheduleName,
      adress: scheduleAdress,
      day: scheduleDay,
      time: scheduleTime,
      dates: dates
    }
    return this.http.post<scheduleDTO>(`${this.url}/api/schedules/sendEmail`, body);

  }
}
