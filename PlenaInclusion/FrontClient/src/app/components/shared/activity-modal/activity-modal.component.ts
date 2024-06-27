import { Component, EventEmitter, Input, Output } from '@angular/core';
import { activityDTO } from 'src/app/models/activity/activityDTO';
import { ActivityService } from 'src/app/services/activities/activity.service';

declare var bootstrap: any;

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css']
})
export class ActivityModalComponent {
  @Input() selectedActivity: activityDTO | null = null;

  @Output() activitiesChange: EventEmitter<activityDTO> = new EventEmitter<activityDTO>();

  Photo: File | undefined;

  archivoInsertado: boolean = true;
  archivoInsertadoValid: boolean = true;
  imagenMostrada: any;

  adviceTitle: string = "";

  actionType: 'delete' | 'update' | null = null;


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
      this.archivoInsertadoValid = true;
      this.Photo = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenMostrada = e.target.result;
        if (this.selectedActivity) {
          this.selectedActivity.Photo = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    } else {
      this.archivoInsertadoValid = false;
      this.imagenMostrada = null;
      if (this.selectedActivity) {
        this.selectedActivity.Photo = '';
      }
    }

    this.archivoInsertado = true;
  }

  constructor(private activityService: ActivityService) { }

  updateActivity() {
    this.activityService.updateActivity(this.selectedActivity!, this.Photo).subscribe({
      next: (response) => {
        this.adviceTitle = "Actividad actualizada correctamente!!!";
      },
      error: (error: any) => {
        console.log(error)

        this.adviceTitle = "Ha habido un error en la actualización de la actividad";

        this.activitiesChange.emit();
      },
      complete: () => {
        this.activitiesChange.emit();
        this.openAdviceModal();

      }
    })
  }

  openAdviceModal() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openConfirmationModal(actionType: 'delete' | 'update') {
    this.actionType = actionType;
    const modalElement = document.getElementById('confirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteActivity() {
    this.activityService.deleteActivty(this.selectedActivity?.ID_activity!).subscribe({
      next: response => {
        this.deleteSuccessModal();
      },
      error: (error: any) => {
        this.deleteFailedModal()
      },
      complete: () => {
        this.activitiesChange.emit();
      }
    })
  }

  deleteSuccessModal() {
    const modalElement = document.getElementById('successDelete');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteFailedModal() {
    const modalElement = document.getElementById('errorModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


}
