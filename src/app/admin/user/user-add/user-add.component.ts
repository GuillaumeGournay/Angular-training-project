import { Component, OnInit } from '@angular/core';
import { AdminUserService } from 'src/app/services/admin-user/admin-user.service';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AdminGenderService } from 'src/app/services/admin-gender/admin-gender.service';
import { AdminCityService } from 'src/app/services/admin-city/admin-city.service';
import { GenderModel } from 'src/app/models/gender.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { CityModel } from 'src/app/models/city.model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  form: FormGroup;
  formData: FormData = new FormData();
  fileData: File = null;
  genders: GenderModel[] = [];
  cities: CityModel[] = [];
  isAdmin: Boolean = false;
  fileDataName: String = '';

  constructor(private adminUserService: AdminUserService,
    private adminGenderService: AdminGenderService,
    private adminCityService: AdminCityService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      lastname: ['', [Validators.required, Validators.maxLength(30)]],
      firstname: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9!$@#]')]],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profilePic: [''],
      genderId: [''],
      cityId: [''],
      isAdmin: ['']
    })


    this.adminGenderService.getGenders().subscribe(
      (data: GenderModel[]) => {
        this.genders = data;
      }
    )
    this.adminCityService.getCities().subscribe(
      (data: CityModel[]) => {
        this.cities = data;
      }
    )

  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.fileData = file;
      this.fileDataName = this.fileData.name;
    }
  }

  onSubmit(): void {
    this.formData.append('firstname', this.form.get('firstname').value);
    this.formData.append('lastname', this.form.get('lastname').value);
    this.formData.append('birthdate', this.form.get('birthdate').value);
    this.formData.append('profilePic', this.fileData);
    this.formData.append('email', this.form.get('email').value);
    this.formData.append('password', this.form.get('password').value);
    this.formData.append('isAdmin', this.form.get('isAdmin').value);
    this.formData.append('genderId', this.form.get('genderId').value);
    this.formData.append('cityId', this.form.get('cityId').value);

    this.adminUserService.addUser(this.formData)
      .subscribe(
        (data: UserModel) => {
          this.router.navigate(['/admin/users']);
        }
      );
  }

  onCheckBoxChange(e) {
    if (e.target.checked) {
      this.form.get('isAdmin').setValue(true);
      this.isAdmin = true;
    }
    else {
      this.form.get('isAdmin').setValue(false);
      this.isAdmin = false;
    }
  }

}
