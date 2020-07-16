import { ConditionsGeneralesComponent } from './components/conditions-generales/conditions-generales.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard as AuthGuard } from 'src/app/guards/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MatchComponent } from './components/user/match/match.component';
import { ConversationComponent } from './components/user/conversation/conversation.component';
import { ProfilComponent } from './components/user/profil/profil.component';
import { InformationsEditComponent } from './components/user/profil/informations-edit/informations-edit.component';
import { ConversationlistComponent } from './components/user/conversationlist/conversationlist.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cgu', component: ConditionsGeneralesComponent },
  {
    path: 'admin',
    loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  { path: 'profil', component: ProfilComponent },
  { path: 'users/edit/:id', component: InformationsEditComponent },
  { path: 'matches', component: MatchComponent, canActivate: [AuthGuard] },
  {
    path: 'chat/list',
    component: ConversationlistComponent,
    children: [
      {
        path: 'chat/:id', component: ConversationComponent, outlet: "conversation"
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
