import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminCityService } from '../../../services/admin-city/admin-city.service';
import { CityModel } from 'src/app/models/city.model';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {

  city: CityModel = new CityModel();

  constructor(
    private AdminCityService: AdminCityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( param => {
      this.city.id = parseInt(param.get('id'))
      })
  }

  onSubmit(): void {
    this.AdminCityService.editCity(this.city)
    .subscribe(
        (city: CityModel)=> {
          this.router.navigate(['/admin/cities']);
        }
      );
  }

}
