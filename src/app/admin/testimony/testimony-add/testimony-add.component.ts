import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminTestimonyService } from '../../../services/admin-testimony/admin-testimony.service';
import { TestimonyModel } from 'src/app/models/testimony.model';

@Component({
  selector: 'app-testimony-add',
  templateUrl: './testimony-add.component.html',
  styleUrls: ['./testimony-add.component.scss']
})
export class TestimonyAddComponent implements OnInit {
  cities: TestimonyModel[] = [];
  testimony: TestimonyModel = new TestimonyModel();

  constructor(
    private adminTestimonyService: AdminTestimonyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.testimony.content = '';
  }

  onSubmit() {
    this.adminTestimonyService.addTestimony(this.testimony)
    .subscribe(
      (data: TestimonyModel) => {
        this.router.navigate(['/admin/testimonies']);
      }
    );
  }
}
