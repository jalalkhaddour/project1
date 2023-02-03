import { StudentYearsInfoPage } from './../pages/student-years-info/student-years-info';
import { AdvertisementDetailsPage } from './../pages/advertisement-details/advertisement-details';
import { AdvertisementsPage } from './../pages/advertisements/advertisements';
import { RegistrationStatusPage } from './../pages/registration-status/registration-status';
import { AboutPage } from './../pages/about/about';
import { RegistrationPage } from './../pages/registration/registration';
import { NewObjectionPage } from './../pages/new-objection/new-objection';
import { ArticlesDetailsPage } from './../pages/articles-details/articles-details';
import { WelcomePage } from './../pages/welcome/welcome';
import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { ArticlesPage } from '../pages/articles/articles';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    ArticlesPage,
    SignupPage,
    LoginPage,
    WelcomePage,
    AboutPage,
    RegistrationPage,
    RegistrationStatusPage,
    ArticlesDetailsPage,
    NewObjectionPage,
    AdvertisementsPage,
    AdvertisementDetailsPage,
    StudentYearsInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    ArticlesPage,
    HomePage,
    SignupPage,
    LoginPage,
    RegistrationPage,
    RegistrationStatusPage,
    AboutPage,
    WelcomePage,
    ArticlesDetailsPage,
    NewObjectionPage,
    AdvertisementsPage,
    AdvertisementDetailsPage,
    StudentYearsInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
  ]
})
export class AppModule {}
