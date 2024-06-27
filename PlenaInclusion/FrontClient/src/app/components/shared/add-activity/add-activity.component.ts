import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { activityDTO } from 'src/app/models/activity/activityDTO';
import { ActivityService } from 'src/app/services/activities/activity.service';
import { DefaultProfileService } from 'src/app/services/staticImages/default-profile.service';
import { isFieldValid } from 'src/utils/fieldValid';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  @ViewChild('nombreCampo') nombreCampo!: NgModel;
  @ViewChild('descripcionCampo') descripcionCampo!: NgModel;

  @Output() activityCreated: EventEmitter<void> = new EventEmitter<void>();

  activity: activityDTO = {
    Name: '',
    Description: ''
  }

  Photo: File | undefined;
  defaultProfileImageUrl: string = "";
  archivoInsertado: boolean = false;
  archivoInsertadoValid: boolean = false;
  imagenMostrada: any;
  isNameEntered: boolean = false;
  isDescritionEntered: boolean = false;

  constructor(private defaultProfileService: DefaultProfileService,
    private activityService: ActivityService) { }

  ngOnInit(): void {
    this.defaultProfileService.getDefaultProfileImage().subscribe({
      next: (imageUrl: string) => {
        this.defaultProfileImageUrl = imageUrl;
      },
      error: (error: any) => {
        console.error('Error al obtener la imagen predeterminada:', error);
      }
    });
  }

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
      };
      reader.readAsDataURL(file);
    } else {
      this.archivoInsertadoValid = false;
      this.imagenMostrada = null;
    }
    this.archivoInsertado = true;
  }

  submitForm(): void {
    if (this.isAllFieldsValid()) {
      this.activityService.addActivity(this.activity, this.Photo).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error('Error en la inserción de la actividad', error);
        },
        complete: () => {
          this.activity.Description = "";
          this.activity.Name = "";
          this.Photo = undefined;
          this.imagenMostrada = null;
          this.activityCreated.emit();
        }
      });
    } else {
      console.error('El formulario no es válido.');
    }
  }

  isFieldValid(value: string): boolean {
    return isFieldValid(value);

  }

  isAllFieldsValid(): boolean | null {
    return this.nombreCampo?.valid && this.descripcionCampo?.valid && this.archivoInsertadoValid;
  }

}
