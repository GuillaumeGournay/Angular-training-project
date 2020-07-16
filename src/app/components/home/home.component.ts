import { AdminTestimonyService } from '../../services/admin-testimony/admin-testimony.service';
import { TestimonyModel } from './../../models/testimony.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

testimonies: TestimonyModel[];

  constructor(
    private adminTestimonyService: AdminTestimonyService
  ) { }

  ngOnInit(): void {
    this.getTestimonies()
  }
  getTestimonies() {
    this.adminTestimonyService.getTestimonies()
    .subscribe(data => {
      console.log(data);
      
      this.testimonies = data })
  }
}
