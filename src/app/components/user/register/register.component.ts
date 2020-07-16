import { AdminCityService } from 'src/app/services/admin-city/admin-city.service';
import { CityModel } from './../../../models/city.model';
import { GenderModel } from './../../../models/gender.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AdminUserService } from 'src/app/services/admin-user/admin-user.service';
import { AdminGenderService } from 'src/app/services/admin-gender/admin-gender.service';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  genders: GenderModel[];
  cities: CityModel[];
  formData: FormData = new FormData();
  fileData : File = null ;
  fileDataName: String = '';

  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private adminGenderService: AdminGenderService,
    private adminUserService: AdminUserService,
    private adminCityService: AdminCityService
  ) {}
  
  ngOnInit(): void {
    this.getGenders();
    this.getcities();
  
    this.form = this.formBuilder.group({
      firstname:['' ,[Validators.required, Validators.maxLength(30)]],
      lastname: ['', [Validators.required, Validators.maxLength(30)]],
      birthdate: ['', Validators.pattern('^(-[0-9]{2}){2}$([0-9]{4})(-[0-9]{2}){2}$')],
      profilePic:[''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9!$@#]{6,20}')]],
      genderId: [''],
      cityId: [''],
    });
  }
  getGenders(){
    this.adminGenderService.getGenders()
    .subscribe(data => {
      console.log(data);
      
      this.genders = data })
  } 
  getcities(){
    this.adminCityService.getCities()
    .subscribe(data => {
      console.log(data);
      
      this.cities = data })
  }

  onFileChange(event) {

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.fileData = file;
      this.fileDataName = this.fileData.name;
      console.log(this.fileData);
            
      this.form.get('profilePic').setValue(file);
    }
  }


  onSubmit(): void {
    this.formData.append('firstname',this.form.get('firstname').value);
    this.formData.append('lastname',this.form.get('lastname').value);
    this.formData.append('birthdate',this.form.get('birthdate').value);
    this.formData.append('profilePic',this.fileData);
    this.formData.append('email',this.form.get('email').value);
    this.formData.append('password',this.form.get('password').value);
    this.formData.append('genderId',this.form.get('genderId').value);    
    this.formData.append('cityId',this.form.get('cityId').value);    
    
    this.adminUserService.addUser(this.formData).subscribe((data: UserModel) => {
      console.log(data);
      this.router.navigate(['/login']);
    },
      (err: Error) => {
        console.log(err);

      },
      () => {
        console.log('Request completed');

      })
  }
}


