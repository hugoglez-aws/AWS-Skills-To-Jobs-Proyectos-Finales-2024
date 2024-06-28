import { Component, OnInit } from '@angular/core';
import { DefaultProfileService } from 'src/app/services/staticImages/default-profile.service';

declare var bootstrap: any;

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  plenaInlcusionLogo: string = "";

  constructor(
    private defaultProfileService: DefaultProfileService
  ) { }

  ngOnInit(): void {
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

}
