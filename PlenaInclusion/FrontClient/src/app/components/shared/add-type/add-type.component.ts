import { Component, EventEmitter, Output } from '@angular/core';
import { typeDTO } from 'src/app/models/type/typeDTO';
import { TypeService } from 'src/app/services/type/type.service';
import { isFieldValid } from 'src/utils/fieldValid';

declare var bootstrap: any;

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent {

  @Output() typeCreated: EventEmitter<void> = new EventEmitter<void>();

  type: typeDTO = {
    Name: '',
    Description: ''
  }

  adviceTitle: string = "";

  constructor(private typeService: TypeService) { }

  submitForm(): void {
    this.typeService.addType(this.type).subscribe({
      next: (response: any) => {
        console.log(response);
        this.adviceTitle = "Tipo creado correctamente!!!";
      },
      error: (error: any) => {
        console.error('Error en la inserción del tipo', error);
        this.adviceTitle = "El tipo no se ha creado correctamente";
      },
      complete: () => {
        this.refreshItems();
        this.typeCreated.emit();
        this.openAdviceModal();
      }
    })
  }

  isFieldValid(value: string): boolean {
    return isFieldValid(value);
  }

  isFormValid(): boolean {
    return this.isFieldValid(this.type.Name) &&
      this.isFieldValid(this.type.Description)
  }

  refreshItems() {
    this.type.Description = "";
    this.type.Name = "";
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
}
