import { TagModel } from './../../../models/tag.model';
import { AdminTagService } from './../../../services/admin-tag/admin-tag.service';
import { AdminUserService } from './../../../services/admin-user/admin-user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image/image.service';
import { CityModel } from '../../../models/city.model';
import { AdminCityService } from '../../../services/admin-city/admin-city.service';
import { GenderModel } from 'src/app/models/gender.model';
import { AdminGenderService } from 'src/app/services/admin-gender/admin-gender.service';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminTestimonyService } from 'src/app/services/admin-testimony/admin-testimony.service';
import { TestimonyModel } from 'src/app/models/testimony.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  formData: FormData = new FormData();
  testimony: TestimonyModel= new TestimonyModel();
  connectedUser: UserModel = new UserModel;
  gender: GenderModel;
  city: CityModel;
  tags: TagModel[];
  userTags: TagModel[];
  constructor(
    private imageService: ImageService,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private adminGenderService: AdminGenderService,
    private adminUserService: AdminUserService,
    private adminTagService: AdminTagService,
    private adminCityService: AdminCityService,
    private formBuilder: FormBuilder,
    private adminTestimonyService: AdminTestimonyService,
    private router: Router) { }


  ngOnInit(): void {

    this.testimony.content= '';
    // On récupère l'utilisateur connecté
    this.authService.userSubject.subscribe(
      user => {
        this.connectedUser = user;

        this.adminTagService.getTags().subscribe(
          (data: TagModel[]) => {

            this.adminUserService.getUserTags(user).subscribe(
              (tags: TagModel[]) => {
                this.userTags = tags;

                for (let i in tags) {
                  data = data.filter(elt => elt.id != tags[i].id)
                }
                this.tags = data;
              }
            )
          }
        )
        // this.adminUserService.getUserDetail(this.connectedUser.id).subscribe(
        //   (user: UserModel) => {
        //     this.connectedUser = user;
        //   }
        // )

        this.adminGenderService.getGenderDetail(this.connectedUser.genderId).subscribe(
          gender => {
            this.gender = gender
          })

        this.adminCityService.getCityDetail(this.connectedUser.cityId).subscribe(
          city => {
            this.city = city
          })

        this.imageService.getUserImage(user.id).subscribe(
          buff => {
            let TYPED_ARRAY = new Uint8Array(buff.data);
            const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
            let base64String = btoa(STRING_CHAR);
            this.connectedUser.profilePic = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
          }
        )

      }
    )
  }
  onSubmit() {

    this.adminTestimonyService.addTestimony(this.testimony).subscribe(
      (result: TestimonyModel) => {
        this.connectedUser.testimonyId = result.id;
        
        this.formData.append('TestimonyId', `${result.id}`)

        this.adminUserService.editUser(this.connectedUser.id, this.formData).subscribe(
          () => {
             this.authService.logout();
             this.router.navigate(['/login'])
                          
          }
        )
      }
    )

  }
  getTags() {
    this.adminTagService.getTags()
      .subscribe(data => this.tags = data);
  }

  deleteTag(tag: TagModel) {
    this.adminTagService.deleteUserTag(tag, this.connectedUser).subscribe(
      () => {
        this.adminTagService.getTags().subscribe(
          (tags: TagModel[]) => {

            this.userTags = this.userTags.filter(elt => elt.id !== tag.id)

            for (let i in this.userTags) {
              tags = tags.filter(elt => elt.id != this.userTags[i].id)
            }
            this.tags = tags;
          }
        )
      }
    )
  }

  addTag(tag: TagModel) {
    this.adminUserService.addUsertag(this.connectedUser, tag).subscribe(
      () => {
        this.adminUserService.getUserTags(this.connectedUser).subscribe(
          (tags: TagModel[]) => {
            this.userTags = tags;
            this.tags = this.tags.filter(elt => elt.id != tag.id)
          }
        )
      }
    )
  }

  loadDefault() {
    this.connectedUser.profilePic = "../../../../assets/img/default.png";
  }

}
