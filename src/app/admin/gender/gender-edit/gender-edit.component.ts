import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminGenderService } from '../../../services/admin-gender/admin-gender.service';
import { GenderModel } from 'src/app/models/gender.model';

@Component({
  selector: 'app-gender-edit',
  templateUrl: './gender-edit.component.html',
  styleUrls: ['./gender-edit.component.scss']
})
export class GenderEditComponent implements OnInit {

  gender: GenderModel = new GenderModel();

  constructor(
    private AdminGenderService: AdminGenderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( param => {
      this.gender.id = parseInt(param.get('id'))
      })
  }

  onSubmit(): void {
    this.AdminGenderService.editGender(this.gender)
    .subscribe(
        (gender: GenderModel)=> {
          this.router.navigate(['/admin/genders']);
        }
      );
  }

}
