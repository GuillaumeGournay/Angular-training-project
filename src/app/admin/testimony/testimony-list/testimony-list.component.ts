import { Component, OnInit } from '@angular/core';
import { AdminTestimonyService } from '../../../services/admin-testimony/admin-testimony.service';
import { TestimonyModel } from '../../../models/testimony.model';

@Component({
  selector: 'app-testimony-list',
  templateUrl: './testimony-list.component.html',
  styleUrls: ['./testimony-list.component.scss']
})
export class TestimonyListComponent implements OnInit {

  testimonies: TestimonyModel[];

  constructor(
    private adminTestimonyService: AdminTestimonyService
  ) { }

  ngOnInit(): void {
    this.getTestimonies();
  }

  getTestimonies(){
    this.adminTestimonyService.getTestimonies()
    .subscribe(data => this.testimonies = data);
  }

  deleteTestimony(id: any) {
    this.adminTestimonyService.deleteTestimony(id).subscribe();
    this.testimonies = this.testimonies.filter(element => element.id !== id);
  }
}
