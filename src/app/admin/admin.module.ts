import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { CityListComponent } from './city/city-list/city-list.component';
import { CityAddComponent } from './city/city-add/city-add.component';
import { CityEditComponent } from './city/city-edit/city-edit.component';
import { TagEditComponent } from './tag/tag-edit/tag-edit.component';
import { TagAddComponent } from './tag/tag-add/tag-add.component';
import { TagListComponent } from './tag/tag-list/tag-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { GenderListComponent } from './gender/gender-list/gender-list.component';
import { GenderAddComponent } from './gender/gender-add/gender-add.component';
import { GenderEditComponent } from './gender/gender-edit/gender-edit.component';
import { TestimonyAddComponent } from './testimony/testimony-add/testimony-add.component';
import { TestimonyEditComponent } from './testimony/testimony-edit/testimony-edit.component';
import { TestimonyListComponent } from './testimony/testimony-list/testimony-list.component';


@NgModule({
  declarations: [
    CityListComponent, 
    CityAddComponent, 
    CityEditComponent,
    TagListComponent,
    TagAddComponent,
    TagEditComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    GenderListComponent,
    GenderAddComponent,
    GenderEditComponent,
    TestimonyAddComponent,
    TestimonyEditComponent,
    TestimonyListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [],
  providers: [DatePipe]
})
export class AdminModule { }
