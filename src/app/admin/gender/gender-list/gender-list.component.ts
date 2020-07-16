import { Component, OnInit } from '@angular/core';
import { AdminGenderService } from '../../../services/admin-gender/admin-gender.service';
import { GenderModel } from '../../../models/gender.model';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.scss']
})
export class GenderListComponent implements OnInit {

  genders: GenderModel[];

  constructor(
    private adminGenderService: AdminGenderService
  ) { }

  ngOnInit(): void {
    this.getGenders();
  }

  getGenders(){
    this.adminGenderService.getGenders()
    .subscribe(data => this.genders = data);
  }

  deleteGender(id: any) {
    this.adminGenderService.deleteGender(id).subscribe();
    this.genders = this.genders.filter(element => element.id !== id);
  }
}
