import { Component, OnInit } from '@angular/core';
import { DefaultProfileService } from 'src/app/services/staticImages/default-profile.service';

@Component({
  selector: 'app-no-activity-found',
  templateUrl: './no-activity-found.component.html',
  styleUrls: ['./no-activity-found.component.css']
})
export class NoActivityFoundComponent implements OnInit {

  noResultIMG: string = "";

  constructor( private defaultProfileService: DefaultProfileService) { }

  ngOnInit(): void {
    this.defaultProfileService.getNoActivityImage().subscribe({
      next: (imageUrl: string) => {
        this.noResultIMG = imageUrl;
      },
      error: (error: any) => {
        console.error('Error al obtener la imagen predeterminada:', error);
      }
    });
  }

}
