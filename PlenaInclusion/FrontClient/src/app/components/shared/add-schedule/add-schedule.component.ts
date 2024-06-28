import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
import { typeDTO } from 'src/app/models/type/typeDTO';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';
import { activityDTO } from 'src/app/models/activity/activityDTO';
import { TypeService } from 'src/app/services/type/type.service';
import { ActivityService } from 'src/app/services/activities/activity.service';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { AllSchedulesService } from 'src/app/services/schedules/listSchedules/all-schedules.service';
import { areDatesValid } from 'src/utils/dateValid';
import { isFieldValid } from 'src/utils/fieldValid';

declare var bootstrap: any;

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  @Output() scheduleCreated: EventEmitter<void> = new EventEmitter<void>();

  schedule: scheduleDTO = {
    Address: '',
    DayOfWeek: '',
    StartHour: '',
    FinishHour: '',
    Frequency: '',
    StartDate: new Date(),
    FinishDate: new Date(),
    Capacity: 0,
    Attendance: 0,
    ID_Activity: '',
    ID_Type: '',
    ID_Campaign: ''
  }

  isValidAdress: boolean = false;
  adviceTitle: string = "";
  activities: activityDTO[] = [];
  campaigns: CampaignDTO[] = [];
  types: typeDTO[] = [];

  constructor(private typeService: TypeService,
    private campaignService: CampaignService,
    private scheduleService: AllSchedulesService,
    private activityService: ActivityService) { }

  ngOnInit(): void {
    this.handleTypes();
    this.handleCampaigns();
    this.handeActivities();
  }

  handleTypes(): void {
    this.typeService.getAllTypes().subscribe({
      next: (response: typeDTO[]) => {
        this.types = response;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  handleCampaigns(): void {
    this.campaignService.listAllCampaigns().subscribe({
      next: (response: CampaignDTO[]) => {
        this.campaigns = response;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  handeActivities(): void {
    this.activityService.listAllActivities().subscribe({
      next: (response: activityDTO[]) => {
        this.activities = response;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }


  onAddressInputChange(value: string): void {
    this.isValidAdress = isFieldValid(value);
  }

  areDatesValid(): boolean {
    return areDatesValid(this.schedule.StartDate, this.schedule.FinishDate);
  }

  validateHours() {
    const startHour = new Date('1970-01-01T' + this.schedule.StartHour + ':00');
    const finishHour = new Date('1970-01-01T' + this.schedule.FinishHour + ':00');

    if (startHour > finishHour) {
      alert('La hora de finalización no puede ser una hora pasada a la hora de inicio.');
    }
  }

  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return daysOfWeek[date.getDay()];
  }

  onStartDateChange(): void {
    this.schedule.DayOfWeek = this.getDayOfWeek(new Date(this.schedule.StartDate));
  }

  selectedActivityID: string = '';

  selectActivity(activity: activityDTO): void {
    this.schedule.ID_Activity = activity.ID_activity!;
    this.selectedActivityID = activity.ID_activity!;
  }

  submitForm() {
    this.scheduleService.postSchedule(this.schedule).subscribe({
      next: (response: scheduleDTO) => {
        this.adviceTitle = "Horario Creado Correctamente";
      },
      error: (error: any) => {
        this.adviceTitle = "Error al Crear El Horario";
        this.openAdviceModal();
        this.refreshItems();
      },
      complete: () => {
        this.refreshItems()
        this.openAdviceModal();
        this.scheduleCreated.emit();
      }
    })
  }

  refreshItems() {
    this.schedule.Address = '',
      this.schedule.DayOfWeek = '',
      this.schedule.StartHour = '',
      this.schedule.FinishHour = '',
      this.schedule.Frequency = '',
      this.schedule.StartDate = new Date(),
      this.schedule.FinishDate = new Date(),
      this.schedule.Capacity = 0,
      this.schedule.Attendance = 0,
      this.schedule.ID_Activity = '',
      this.schedule.ID_Type = '',
      this.schedule.ID_Campaign = ''
  }

  openAdviceModal() {
    const modalElement = document.getElementById('advicePopUp');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  isFormValid(): boolean {
    const isAddressValid = this.isValidAdress;
    const areHoursValid = this.schedule.StartHour !== '' && this.schedule.FinishHour !== '';
    let areDatesValid = this.areDatesValid();
    if (this.schedule.Frequency == "Puntual") {
      this.schedule.FinishDate = this.schedule.StartDate;
      areDatesValid = true;
    }
    const areRequiredFieldsFilled = this.schedule.ID_Activity !== '' &&
      this.schedule.ID_Type !== '' &&
      this.schedule.ID_Campaign !== '' &&
      this.schedule.Frequency !== '' &&
      this.schedule.Address !== '' &&
      this.schedule.StartDate !== null &&
      this.schedule.FinishDate !== null &&
      this.schedule.Capacity > 0;

    return isAddressValid && areHoursValid && areDatesValid && areRequiredFieldsFilled;
  }

}
