import { Component, OnInit } from '@angular/core';
import { activityDTO } from 'src/app/models/activity/activityDTO';
import { ActivityService } from 'src/app/services/activities/activity.service';
import { DefaultProfileService } from 'src/app/services/staticImages/default-profile.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.css']
})
export class ManageActivitiesComponent implements OnInit {

  activities: activityDTO[] = [];
  filteredActivities: activityDTO[] = [];
  selectedActivity: activityDTO | null = null;
  searchTerm: string = '';
  loading: boolean = true;

  plenaInlcusionLogo: string = "";

  constructor(private activityService: ActivityService,
    private defaultProfileService: DefaultProfileService
  ) { }

  ngOnInit(): void {
    this.handleActivities();
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

  handleActivities(): void {
    this.loading = true;
    this.activityService.listAllActivities().subscribe({
      next: (data: activityDTO[]) => {
        this.activities = data;
        this.filteredActivities = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error fetching activities', error);
        this.loading = false;
      }
    });
  }

  onActivityClick(activity: activityDTO): void {
    this.selectedActivity = activity;
    const modalElement = document.getElementById('activityModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addActivityModal(): void {
    const modalElement = document.getElementById('addActivityModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  applyFilter(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredActivities = this.activities.filter(activity =>
      activity.Name.toLowerCase().includes(searchTermLower)
    );
  }
}
