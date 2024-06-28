import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';


@Injectable({
  providedIn: 'root'
})
export class UserScheduleService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  postSchedule(userId: string, scheduleId: string, date: string): Observable<any> {
    const body = {
      UserIDUser: userId,
      ScheduleIDSchedule: scheduleId,
      AttendanceDate: date
    }
    return this.http.post<any>(`${this.url}/api/userSchedules`, body);
  }

  listSchedulesByUser(userId: string | null) {
    return this.http.get<any>(`${this.url}/api/userSchedules/users/${userId}/schedules`);
  }

  listScheduleBySchedule(scheduleId: string | null): Observable<userScheduleDTO[]> {
    return this.http.get<userScheduleDTO[]>(`${this.url}/api/userSchedules/schedules/${scheduleId}/users`);
  }

  deleteRegistation(userId: string, scheduleId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/userSchedules/deleteByUserAndSchedule/${userId}/${scheduleId}`);
  }

  rateUserSchedule(idUserSchedule: string, rating: number, comment: string): Observable<any> {
    const body = {
      Comment: comment,
      Rating: rating
    }
    return this.http.put<any>(`${this.url}/api/userSchedules/${idUserSchedule}`, body);
  }
}
