import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { isFieldValid } from 'src/utils/fieldValid';

declare var bootstrap: any;

@Component({
  selector: 'app-campagne-modal',
  templateUrl: './campagne-modal.component.html',
  styleUrls: ['./campagne-modal.component.css']
})
export class CampagneModalComponent {

  @Input() selectedCampaign: CampaignDTO | null = null;

  @Output() campaignsChange: EventEmitter<CampaignDTO> = new EventEmitter<CampaignDTO>();

  adviceTitle: string = "";
  isValidDate: boolean = true;
  isInvalidDate: boolean = false;
  actionType: 'delete' | 'update' | null = null;
  messageModal: string = "";

  constructor(private campaignService: CampaignService) { }

  deleteCampagne() {
    this.campaignService.deleteCampaign(this.selectedCampaign?.ID_Campaign!).subscribe({
      next: response => {
        this.adviceTitle = "Campaña borrada correctamente!!!";
      },
      error: (error: any) => {
        console.log(error)
        this.adviceTitle = "Campaña Pertenece a un Horario, de momento no se puede borrar.";
        this.openAdviceModal();
      },
      complete: () => {
        this.campaignsChange.emit();
        this.openAdviceModal();
      }
    })
  }

  updateCampagne() {
    this.campaignService.updateCampaign(this.selectedCampaign!).subscribe({
      next: response => {
        this.adviceTitle = "Campaña actualizada correctamente!!!";
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        this.campaignsChange.emit();
        this.openAdviceModal();
      }
    })
  }

  openConfirmationModal(actionType: 'delete' | 'update') {
    this.actionType = actionType;
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmAction() {
    if (this.actionType === 'delete') {
      this.deleteCampagne();
    } else if (this.actionType === 'update') {
      this.updateCampagne();
    } 
  }

  openAdviceModal() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  validateDate() {
    if (this.selectedCampaign) {
      const startDate = new Date(this.selectedCampaign.StartDate);
      const finishDate = new Date(this.selectedCampaign.FinishDate);
      console.log(startDate, finishDate);

      this.isValidDate = finishDate > startDate;
      if (this.isValidDate) {
        console.log("Fechas correctas");
      }
      this.isInvalidDate = finishDate <= startDate;
      if (this.isInvalidDate) {
        console.log("Fechas incorrectas");
        alert("La fecha de finalización debe ser posterior a la fecha de inicio.");
      }
    }
  }

  isFieldValid(value: string): boolean {
    return isFieldValid(value);
  }

  isFormValid(): boolean {
    if (this.selectedCampaign) {
      return this.isFieldValid(this.selectedCampaign.Name) &&
        this.isFieldValid(this.selectedCampaign.Description) &&
        this.isValidDate
    } else {
      return false;
    }
  }

}
