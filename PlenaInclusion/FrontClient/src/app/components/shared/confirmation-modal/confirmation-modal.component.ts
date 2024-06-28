import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() titulo: string | undefined;
  @Input() mensaje: string | undefined;

  @Output() acepted: EventEmitter<void> = new EventEmitter<void>();
  @Output() canceled: EventEmitter<void> = new EventEmitter<void>();

  confirm(): void {
    this.acepted.emit();
  }

  cancel(): void {
    this.canceled.emit();
  }

}
