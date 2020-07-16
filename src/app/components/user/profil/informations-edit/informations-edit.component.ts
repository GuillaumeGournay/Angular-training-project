import { AdminCityService } from 'src/app/services/admin-city/admin-city.service';
import { CityModel } from '../../../../models/city.model';
import { GenderModel } from '../../../../models/gender.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminUserService } from 'src/app/services/admin-user/admin-user.service';
import { AdminGenderService } from 'src/app/services/admin-gender/admin-gender.service';
import { AuthService } from 'src/app/services/auth/auth.service';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-informations-edit',
  templateUrl: './informations-edit.component.html',
  styleUrls: ['./informations-edit.component.scss']
})
export class InformationsEditComponent implements OnInit {
  connectedUser: UserModel = new UserModel();
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
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      lastname: ['', [Validators.maxLength(30)]],
      firstname: ['', [Validators.maxLength(30)]],
      password: ['', [Validators.pattern('[a-zA-Z0-9!$@#]')]],
      birthdate: [''],
      email: ['', [Validators.email]],
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

    this.authService.userSubject.subscribe(
      user => {
        this.connectedUser = user;
      }
    )


  }

  onSubmit(): void {
    if (this.fileData) { this.formData.append('profilePic', this.fileData); }
    if (this.form.get('lastname').value) { this.formData.append('lastname', this.form.get('lastname').value) }
    if (this.form.get('firstname').value) { this.formData.append('firstname', this.form.get('firstname').value) }
    if (this.form.get('password').value) { this.formData.append('password', this.form.get('password').value) }
    if (this.form.get('birthdate').value) { this.formData.append('birthdate', this.form.get('birthdate').value) }
    if (this.form.get('email').value) { this.formData.append('email', this.form.get('email').value) }
    if (this.form.get('isAdmin').value) { this.formData.append('isAdmin', this.form.get('isAdmin').value) }
    if (this.form.get('genderId').value) { this.formData.append('genderId', this.form.get('genderId').value) }
    if (this.form.get('cityId').value) { this.formData.append('cityId', this.form.get('cityId').value) }




    this.adminUserService.editUser(this.connectedUser.id, this.formData)
      .subscribe(
        () => {
          this.authService.logout();
          this.router.navigate(['/login'])
        }
      );

  }




  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.fileData = file;
      this.fileDataName = this.fileData.name;
    }
  }

}
