import { Component, OnInit } from '@angular/core';
import { CampaignDTO } from 'src/app/models/campaign/campaignDTO';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { DefaultProfileService } from 'src/app/services/staticImages/default-profile.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-campagne',
  templateUrl: './manage-campagne.component.html',
  styleUrls: ['./manage-campagne.component.css']
})
export class ManageCampagneComponent implements OnInit {

  campaigns: CampaignDTO[] = [];
  filteredCampaigns: CampaignDTO[] = [];
  selectedCampaign: CampaignDTO | null = null;
  searchTerm: string = '';
  loading: boolean = true;

  plenaInlcusionLogo: string = "";

  constructor(private campaignService: CampaignService,
    private defaultProfileService: DefaultProfileService
  ) { }

  ngOnInit(): void {
    this.handleCampaigns();
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

  handleCampaigns(): void {
    this.loading = true;
    this.campaignService.listAllCampaigns().subscribe({
      next: (response: CampaignDTO[]) => {
        this.campaigns = response;
        this.filteredCampaigns = response;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error recogiendo las campañas', error);
        this.loading = false;
      }
    });
  }

  onCampaignClick(campaign: CampaignDTO): void {
    this.selectedCampaign = campaign;
    const modalElement = document.getElementById('campaignModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addCampaignModal(): void {
    const modalElement = document.getElementById('addCampaignModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  applyFilter(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCampaigns = this.campaigns.filter(campaign =>
      campaign.Name.toLowerCase().includes(searchTermLower)
    );
  }
}
