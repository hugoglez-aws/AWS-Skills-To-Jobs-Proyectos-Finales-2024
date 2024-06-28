import { Component, EventEmitter, Input, Output } from '@angular/core';
import { typeDTO } from 'src/app/models/type/typeDTO';
import { TypeService } from 'src/app/services/type/type.service';
import { isFieldValid } from 'src/utils/fieldValid';

declare var bootstrap: any;

@Component({
  selector: 'app-type-modal',
  templateUrl: './type-modal.component.html',
  styleUrls: ['./type-modal.component.css']
})
export class TypeModalComponent {

  @Input() selectedType: typeDTO | null = null;

  @Output() typeChange: EventEmitter<typeDTO> = new EventEmitter<typeDTO>();

  adviceTitle: string = "";

  actionType: 'delete' | 'update' | null = null;


  constructor(private typeService: TypeService) { }

  deleteType() {
    this.typeService.deleteType(this.selectedType?.ID_type!).subscribe({
      next: response => {
        this.adviceTitle = "Tipo borrado correctamente!!!";
      },
      error: (error: any) => {
        console.log(error)
        this.adviceTitle = "El tipo Pertenece a un Horario, de momento no se puede borrar.";
        this.openAdviceModal();
      },
      complete: () => {
        this.typeChange.emit();
        this.openAdviceModal();
      }
    })
  }

  updateType() {
    this.typeService.updateType(this.selectedType!).subscribe({
      next: response => {
        this.adviceTitle = "Tipo actualizado correctamente!!!";
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        this.typeChange.emit();
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

  isFieldValid(value: string): boolean {
    return isFieldValid(value);
  }

  isFormValid(): boolean {
    if (this.selectedType) {
      return this.isFieldValid(this.selectedType.Name) &&
        this.isFieldValid(this.selectedType.Description)
    } else {
      return false;
    }
  }

  confirmAction() {
    if (this.actionType === 'delete') {
      this.deleteType();
    } else if (this.actionType === 'update') {
      this.updateType();
    }
  }
}
