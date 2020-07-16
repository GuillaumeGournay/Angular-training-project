import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';


import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor'
// import { API_URL } from './interceptors/base-url.interceptor';
import { environment } from '../environments/environment';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ChatService } from './services/chat/chat.service';
import { MatchComponent } from './components/user/match/match.component';
import { ConversationComponent } from './components/user/conversation/conversation.component';
import { ProfilComponent } from './components/user/profil/profil.component';
import { InformationsEditComponent } from './components/user/profil/informations-edit/informations-edit.component';
import { ConversationlistComponent } from './components/user/conversationlist/conversationlist.component';
import { ConditionsGeneralesComponent } from './components/conditions-generales/conditions-generales.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    ContactComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MatchComponent,
    ConversationComponent,
    ProfilComponent,
    InformationsEditComponent,
    ConversationlistComponent,
    ConditionsGeneralesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    // {
    //   provide: API_URL,
    //   useValue: environment.apiURL
    // },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: BaseUrlInterceptor,
      // deps: [API_URL],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: ChatService,
      // deps: [API_URL]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
