import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminGenderService } from '../../../services/admin-gender/admin-gender.service';
import { GenderModel } from 'src/app/models/gender.model';

@Component({
  selector: 'app-gender-add',
  templateUrl: './gender-add.component.html',
  styleUrls: ['./gender-add.component.scss']
})
export class GenderAddComponent implements OnInit {
  gender: GenderModel = new GenderModel();

  constructor(
    private adminGenderService: AdminGenderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gender.name = '';
  }

  onSubmit(): void {
    this.adminGenderService.addGender(this.gender)
    .subscribe(
      (data: GenderModel) => {
        this.router.navigate(['/admin/genders']);
      }
    );
  }
}
