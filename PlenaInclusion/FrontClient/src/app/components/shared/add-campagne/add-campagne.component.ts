import { Component, EventEmitter, Output } from '@angular/core';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { isFieldValid } from 'src/utils/fieldValid';
import { areDatesValid } from 'src/utils/dateValid';

declare var bootstrap: any;

@Component({
  selector: 'app-add-campagne',
  templateUrl: './add-campagne.component.html',
  styleUrls: ['./add-campagne.component.css']
})
export class AddCampagneComponent {

  @Output() campaignCreated: EventEmitter<void> = new EventEmitter<void>();

  campaign: CampaignDTO = {
    Name: '',
    Description: '',
    StartDate: new Date(),
    FinishDate: new Date()
  }

  adviceTitle: string = "";

  constructor(private campaignService: CampaignService) { }

  submitForm(): void {
    this.campaignService.addCampaign(this.campaign).subscribe({
      next: (response: any) => {
        console.log(response);
        this.adviceTitle = "Campaña creada correctamente!!!";
      },
      error: (error: any) => {
        console.error('Error en la inserción de la campaña', error);
        this.adviceTitle = "La campaña no se ha creado correctamente";
      },
      complete: () => {
        this.refreshItems();
        this.campaignCreated.emit();
        this.openAdviceModal();
      }
    })
  }

  isFieldValid(value: string): boolean {
    return isFieldValid(value);
  }

  isFormValid(): boolean {
    return this.isFieldValid(this.campaign.Name) &&
      this.isFieldValid(this.campaign.Description) &&
      this.areDatesValid();
  }

  areDatesValid(): boolean {
    return areDatesValid(this.campaign.StartDate, this.campaign.FinishDate);
  }

  openConfirmationModal() {
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openAdviceModal() {
    const modalElement = document.getElementById('advice');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  refreshItems() {
    this.campaign.Description = "";
    this.campaign.Name = "";
    this.campaign.StartDate = new Date();
    this.campaign.FinishDate = new Date();
  }
}
