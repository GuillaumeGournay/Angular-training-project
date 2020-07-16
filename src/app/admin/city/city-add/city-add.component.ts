import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminCityService } from '../../../services/admin-city/admin-city.service';
import { CityModel } from 'src/app/models/city.model';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.scss']
})
export class CityAddComponent implements OnInit {
  city: CityModel = new CityModel();

  constructor(
    private adminCityService: AdminCityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.city.name = '';
    this.city.postcode = 0;
  }

  onSubmit(): void {
    this.adminCityService.addCity(this.city)
    .subscribe(
      (data: CityModel) => {
        this.router.navigate(['/admin/cities']);
      }
    );
  }
}
