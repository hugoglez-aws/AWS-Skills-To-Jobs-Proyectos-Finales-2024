import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { activityDTO } from 'src/app/models/activity/activityDTO';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  listAllActivities(): Observable<activityDTO[]> {
    return this.http.get<activityDTO[]>(`${this.url}/api/activities`);
  }

  addActivity(activity: activityDTO, file: File | undefined): Observable<any> {
    const formData = new FormData();
    formData.append('Name', activity.Name);
    formData.append('Description', activity.Description);
    if (file) {
      formData.append('Photo', file);
    }
    return this.http.post<any>(`${this.url}/api/activities`, formData);
  }

  updateActivity(activity: activityDTO, file?: File): Observable<activityDTO> {
    const formData = new FormData();
    formData.append('Name', activity.Name);
    formData.append('Description', activity.Description);
    if (file) {
      formData.append('Photo', file);
    }
    return this.http.put<activityDTO>(`${this.url}/api/activities/${activity.ID_activity}`, formData);
  }

  deleteActivty(idActivity: string) {
    return this.http.delete<activityDTO[]>(`${this.url}/api/activities/${idActivity}`);
  }

}
