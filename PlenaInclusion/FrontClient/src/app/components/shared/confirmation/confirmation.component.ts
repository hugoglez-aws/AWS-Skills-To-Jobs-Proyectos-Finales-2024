import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  @Input() title: string = 'Modal title';
  @Input() cancelButtonText: string = 'Close';
  @Input() confirmButtonText: string = 'Confirm';
  @Input() onConfirm: Function = () => { };

  ejecutarFuncionDelPadre() {
    if (this.onConfirm) {
      this.onConfirm();
    }
  }
}
