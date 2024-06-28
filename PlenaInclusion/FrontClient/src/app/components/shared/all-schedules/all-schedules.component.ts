import { Component, OnInit } from '@angular/core';
import { scheduleDTO } from 'src/app/models/schedule/scheduleDTO';
import { typeDTO } from 'src/app/models/type/typeDTO';
import { userScheduleDTO } from 'src/app/models/userSchedule/userScheduleDTO';
import { AllSchedulesService } from 'src/app/services/schedules/listSchedules/all-schedules.service';
import { DefaultProfileService } from 'src/app/services/staticImages/default-profile.service';
import { TypeService } from 'src/app/services/type/type.service';
import { UserScheduleService } from 'src/app/services/userSchedule/user-schedule.service';

declare var bootstrap: any;

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.css']
})
export class AllSchedulesComponent implements OnInit {

  schedules: scheduleDTO[] = [];
  filteredSchedules: scheduleDTO[] = [];
  typeList: typeDTO[] = [];
  selectedSchedule: scheduleDTO | null = null;
  userSchedules: userScheduleDTO[] = [];
  searchTerm: string = '';
  startDate: string | null = null;
  endDate: string | null = null;
  selectedType: string | null = null;
  selectedFrequency: string | null = null;
  selectedDay: string | null = null;
  showRegistered: boolean = false;
  showNotRegistered: boolean = false;

  loading: boolean = true;

  role: string | null = sessionStorage.getItem("Rol");
  plenaInlcusionLogo: string = "";

  constructor(private allSchedulesService: AllSchedulesService,
    private userScheduleService: UserScheduleService,
    private typeService: TypeService,
    private defaultProfileService: DefaultProfileService
  ) { }

  ngOnInit(): void {
    this.startDate = new Date().toISOString().split('T')[0];
    this.handleUserSchedules();
    this.handleSchedules();
    this.handleTypes();
    this.getLogo();
  }

  getLogo(): void {
    this.defaultProfileService.getDefaultPlenaInclusionLogoImage().subscribe({
      next: (imageUrl: string) => {
        this.plenaInlcusionLogo = imageUrl;
      },
      error: (error: any) => {
        console.error('Error al obtener la imagen predeterminada:', error);
      },
      complete: () => {
        this.showInitialToast()
      }
    });
  }

  showInitialToast() {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = new bootstrap.Toast(toastLiveExample, {
      autohide: false
    })
    toastBootstrap.show()
  }

  handleTypes(): void {
    this.typeService.getAllTypes().subscribe({
      next: (data: typeDTO[]) => {
        this.typeList = data;
      },
      error: (error: any) => {
        console.error('Error fetching types:', error);
      }
    });
  }

  handleSchedules(): void {
    this.allSchedulesService.listAllSchedules().subscribe({
      next: (data: scheduleDTO[]) => {
        this.schedules = data;
        this.applyFilter();
      },
      error: (error: any) => {
        console.error('Error fetching schedules:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  handleUserSchedules(): void {
    this.userScheduleService.listSchedulesByUser(JSON.parse(sessionStorage.getItem("user")!).ID_user).subscribe({
      next: (data: userScheduleDTO[]) => {
        this.userSchedules = data;
      },
      error: (error: any) => {
        this.userSchedules = [];
      }
    });
  }

  applyFilter(): void {
    this.filteredSchedules = this.schedules.filter(schedule => {
      const matchesName = schedule.Activity!.Name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const scheduleStartDate = new Date(schedule.StartDate);
      const scheduleFinishDate = new Date(schedule.FinishDate);
      const startDate = this.startDate ? new Date(this.startDate) : null;
      const endDate = this.endDate ? new Date(this.endDate) : null;
      const matchesStartDate = !startDate || scheduleStartDate >= startDate || scheduleFinishDate >= startDate;
      const matchesEndDate = !endDate || scheduleStartDate <= endDate || scheduleFinishDate <= endDate;
      const matchesType = !this.selectedType || schedule.ID_Type === this.selectedType;
      const matchesFrequency = !this.selectedFrequency || schedule.Frequency === this.selectedFrequency;
      const matchesDay = !this.selectedDay || schedule.DayOfWeek === this.selectedDay;
      const isRegistered = this.isUserRegistered(schedule?.ID_Schedule);
      if (this.showRegistered && this.showNotRegistered) {
        return matchesName && matchesStartDate && matchesEndDate && matchesType && matchesFrequency && matchesDay;
      } else if (this.showRegistered) {
        return isRegistered && matchesName && matchesStartDate && matchesEndDate && matchesType && matchesFrequency && matchesDay;
      } else if (this.showNotRegistered) {
        return !isRegistered && matchesName && matchesStartDate && matchesEndDate && matchesType && matchesFrequency && matchesDay;
      } else {
        return matchesName && matchesStartDate && matchesEndDate && matchesType && matchesFrequency && matchesDay;
      }
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.startDate = new Date().toISOString().split('T')[0];
    this.endDate = null;
    this.selectedType = null;
    this.selectedFrequency = null;
    this.selectedDay = null;
    this.showNotRegistered = false;
    this.applyFilter();
  }

  onScheduleClicked(schedule: scheduleDTO): void {
    this.selectedSchedule = schedule;
    const modalElement = document.getElementById('scheduleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  isUserRegistered(scheduleId: string | undefined): boolean {
    return this.userSchedules.some(schedule => schedule.Schedule.ID_Schedule === scheduleId);
  }

  handleScheduleChange(): void {
    this.handleUserSchedules();
    this.handleSchedules();
  }

  addScheduleModal() {
    const modalElement = document.getElementById('addScheduleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
