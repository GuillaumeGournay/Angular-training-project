import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenderModel } from 'src/app/models/gender.model';
import { CityModel } from 'src/app/models/city.model';
import { AdminUserService } from 'src/app/services/admin-user/admin-user.service';
import { AdminGenderService } from 'src/app/services/admin-gender/admin-gender.service';
import { AdminCityService } from 'src/app/services/admin-city/admin-city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  editedUserId: number;
  editedUser: UserModel = new UserModel() ;
  form: FormGroup;
  formData: FormData = new FormData();
  fileData: File = null;
  fileDataName: String = '';
  genders: GenderModel[] = [];
  cities: CityModel[] = [];
  isAdmin: Boolean = false;

  constructor(private adminUserService: AdminUserService,
    private adminGenderService: AdminGenderService,
    private adminCityService: AdminCityService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      lastname: ['', [Validators.maxLength(30)]],
      firstname: ['', [ Validators.maxLength(30)]],
      password: ['', [ Validators.pattern('[a-zA-Z0-9!$@#]')]],
      birthdate: [''],
      email: ['', [ Validators.email]],
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

    this.route.paramMap.subscribe(
      param => {
        this.editedUserId = parseInt(param.get('id'))
      }
    )

    this.adminUserService.getUserDetail(this.editedUserId).subscribe(
      (user: UserModel) => {
        this.editedUser = user;
      }
    )

  }

  onSubmit(): void {
    if (this.fileData) { this.formData.append('profilePic', this.fileData);}
    if (this.form.get('lastname').value) {this.formData.append('lastname', this.form.get('lastname').value)}
    if (this.form.get('firstname').value) {this.formData.append('firstname', this.form.get('firstname').value)}
    if (this.form.get('password').value) {this.formData.append('password', this.form.get('password').value)}
    if (this.form.get('birthdate').value) {this.formData.append('birthdate', this.form.get('birthdate').value)}
    if (this.form.get('email').value) {this.formData.append('email', this.form.get('email').value)}
    if (this.form.get('isAdmin').value) {this.formData.append('isAdmin', this.form.get('isAdmin').value)}
    if (this.form.get('genderId').value) {this.formData.append('genderId', this.form.get('genderId').value)}
    if (this.form.get('cityId').value) {this.formData.append('cityId', this.form.get('cityId').value)}
    



    this.adminUserService.editUser(this.editedUserId, this.formData)
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

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.fileData = file;
      this.fileDataName = this.fileData.name;
    }
  }

}
