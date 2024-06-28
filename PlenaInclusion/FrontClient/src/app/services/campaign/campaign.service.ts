import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  /**
   * Servicio que devuelte todas las campañas
   * @returns 
   */
  listAllCampaigns(): Observable<CampaignDTO[]> {
    return this.http.get<CampaignDTO[]>(`${this.url}/api/campaigns`);
  }

/**
 * Este servicio isnerta un registro de una campaña a la base de datos
 * @param campaign 
 * @returns 
 */
  addCampaign(campaign: CampaignDTO): Observable<any> {
    return this.http.post<any>(`${this.url}/api/campaigns`, campaign);
  }

  /**
   * Servicio que elimina un registro de la base de datos
   * @param idCampaign 
   * @returns 
   */
  deleteCampaign(idCampaign: string) {
    return this.http.delete<CampaignDTO>(`${this.url}/api/campaigns/${idCampaign}`);
  }

  /**
   * Servicio que actualiza un registro de la base de datos.
   * @param campaign 
   * @returns 
   */
  updateCampaign(campaign: CampaignDTO) {
    const { ID_Campaign, ...campaignBody } = campaign;
    return this.http.put<CampaignDTO>(`${this.url}/api/campaigns/${ID_Campaign}`, campaignBody);
  }

}
