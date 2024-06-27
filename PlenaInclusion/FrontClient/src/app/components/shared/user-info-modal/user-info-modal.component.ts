import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDTO } from 'src/app/models/user/userDTO';
import { UserService } from 'src/app/services/user/user.service';
declare var bootstrap: any;

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.css']
})
export class UserInfoModalComponent implements OnInit {

  @Input() selectedUser: UserDTO | null = null;

  @Output() activitiesChange: EventEmitter<UserDTO> = new EventEmitter<UserDTO>();

  allUsers: UserDTO[] = [];

  BirthDay: string = "";

  Photo: File | undefined;
  archivoInsertado: boolean = true;
  archivoInsertadoValid: boolean = true;
  imagenMostrada: boolean = false;

  adviceTitle: string = "";

  isDNIValid: boolean = true;
  isRolSelected: boolean = false;
  isValidDate: boolean = true;
  isNameEntered: boolean = true;
  isSurname1Entered: boolean = false;
  isSurname2Entered: boolean = false;
  isValidEmail: boolean = true;
  isValidAdress: boolean = false;
  isValidPhone: boolean = true;
  isPasswordValid: boolean = false;
  passwordsMatch: boolean = false;
  confirmPassValid: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  updateUser() {
    this.selectedUser!.BirthDay! = this.BirthDay;
    this.userService.updateUser(this.selectedUser!, this.Photo!).subscribe({
      next: (response: UserDTO) => {
        console.log(response)
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response: UserDTO[]) => {
        this.allUsers = response;
      },
      error: (error: any) => {
      }
    })
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
        if (this.selectedUser) {
          this.selectedUser.Photo = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    } else {
      this.archivoInsertadoValid = false;
      this.imagenMostrada = false;
      if (this.selectedUser) {
        this.selectedUser.Photo = '';
      }
    }

    this.archivoInsertado = true;
  }

  isDNICorrect(): boolean {
    this.isDNIValid = this.selectedUser!.DNI!.length === 9;
    return this.isDNIValid;
  }

  onDNIInputChange(): void {
    this.isDNICorrect();
  }

  validateDate() {
    const userDate = new Date(this.BirthDay);
    const currentDate = new Date();

    if (userDate > currentDate) {
      alert('La fecha de nacimiento no puede ser una fecha futura.');
      this.isValidDate = false;
    } else {
      this.isValidDate = true;
    }
  }

  isRolValid(): boolean {
    this.isRolSelected = this.selectedUser!.Rol !== '';
    return this.isRolSelected;
  }

  isValidName(value: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(value.trim());
    this.isNameEntered = value.trim() !== '' && isValid;
    return isValid;
  }

  isValidSurname1(value: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(value.trim());
    this.isSurname1Entered = value.trim() !== '' && isValid;
    return isValid;
  }

  isValidSurname2(value: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    const isValid = regex.test(value.trim());
    this.isSurname2Entered = value.trim() !== '' && isValid;
    return isValid;
  }

  isValidInput(value: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(value.trim());
  }

  onEmailChange(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]/;
    if (emailRegex.test(value)) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = false;
    }
  }

  onAddressInputChange(value: string): void {
    this.isValidInputAdress(value);
  }

  isValidInputAdress(value: string): boolean {
    const regex = /^[a-zA-Z0-9\s]+$/;
    this.isValidAdress = regex.test(value.trim());
    return this.isValidAdress;
  }

  isValidInputPhone(value: string): boolean {
    const regex = /^[0-9]{9}$/;
    this.isValidPhone = regex.test(value.trim());
    return this.isValidPhone;
  }

  onPhoneInputChange(value: string): void {
    this.isValidInputPhone(value);
  }

  dniTutorValido: boolean = false;

  validarDniTutor(): void {
    this.dniTutorValido = this.selectedUser!.DNI_tutor!.length === 9;
  }
}
