import { Component, OnInit } from '@angular/core';
import { AdminCityService } from '../../../services/admin-city/admin-city.service';
import { CityModel } from '../../../models/city.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  cities: CityModel[];

  constructor(
    private adminCityService: AdminCityService
  ) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(){
    this.adminCityService.getCities()
    .subscribe(data => this.cities = data);
  }

  deleteCity(id: any) {
    this.adminCityService.deleteCity(id).subscribe();
    this.cities = this.cities.filter(element => element.id !== id);
  }
}
