import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminTestimonyService } from '../../../services/admin-testimony/admin-testimony.service';
import { TestimonyModel } from 'src/app/models/testimony.model';

@Component({
  selector: 'app-testimony-edit',
  templateUrl: './testimony-edit.component.html',
  styleUrls: ['./testimony-edit.component.scss']
})
export class TestimonyEditComponent implements OnInit {

  testimony: TestimonyModel = new TestimonyModel();

  constructor(
    private adminTestimonyService: AdminTestimonyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( param => {
      this.testimony.id = parseInt(param.get('id'))
      })
  }

  onSubmit(): void {
    this.adminTestimonyService.editTestimony(this.testimony)
    .subscribe(
        (testimony: TestimonyModel)=> {
          this.router.navigate(['/admin/testimonies']);
        }
      );
  }

}
