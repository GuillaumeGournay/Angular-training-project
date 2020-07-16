import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityListComponent as AdminCityList } from './city/city-list/city-list.component';
import { CityAddComponent as AdminCityAdd } from './city/city-add/city-add.component';
import { CityEditComponent as AdminCityEdit } from './city/city-edit/city-edit.component';
import { TagListComponent as AdminTagList } from './tag/tag-list/tag-list.component';
import { TagAddComponent as AdminTagAdd } from './tag/tag-add/tag-add.component';
import { TagEditComponent as AdminTagEdit } from './tag/tag-edit/tag-edit.component';
import { UserListComponent as AdminUserList } from './user/user-list/user-list.component';
import { UserAddComponent as AdminUserAdd } from './user/user-add/user-add.component';
import { UserEditComponent as AdminUserEdit } from './user/user-edit/user-edit.component';
import { GenderListComponent as AdminGenderList } from './gender/gender-list/gender-list.component';
import { GenderAddComponent as AdminGenderAdd } from './gender/gender-add/gender-add.component';
import { GenderEditComponent as AdminGenderEdit } from './gender/gender-edit/gender-edit.component';
import { TestimonyEditComponent as AdminTestimonyEdit } from './testimony/testimony-edit/testimony-edit.component';
import { TestimonyAddComponent as AdminTestimonyAdd } from './testimony/testimony-add/testimony-add.component';
import { TestimonyListComponent as AdminTestimonyList} from './testimony/testimony-list/testimony-list.component';


const adminRoutes: Routes = [
    { path: 'cities', component: AdminCityList },
    { path: 'cities/add', component: AdminCityAdd },
    { path: 'cities/edit/:id', component: AdminCityEdit },
    { path: 'tags', component: AdminTagList},
    { path: 'tags/add', component: AdminTagAdd},
    { path: 'tags/edit/:id', component: AdminTagEdit},
    { path: 'users', component: AdminUserList},
    { path: 'users/add', component: AdminUserAdd},
    { path: 'users/edit/:id', component: AdminUserEdit},
    { path: 'genders', component: AdminGenderList},
    { path: 'genders/add', component: AdminGenderAdd},
    { path: 'genders/edit/:id', component: AdminGenderEdit},
    { path: 'testimonies', component: AdminTestimonyList },
    { path: 'testimonies/add', component: AdminTestimonyAdd },
    { path: 'testimonies/edit/:id', component: AdminTestimonyEdit }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }