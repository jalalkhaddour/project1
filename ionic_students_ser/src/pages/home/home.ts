import { StudentYearsInfoPage } from './../student-years-info/student-years-info';
import { AdvertisementsPage } from './../advertisements/advertisements';
import { RegistrationStatusPage } from './../registration-status/registration-status';
import { AboutPage } from './../about/about';
import { LoginPage } from './../login/login';
import { DataProvider } from './../../providers/data/data';
import { ContactPage } from './../contact/contact';
import { ArticlesPage } from './../articles/articles';
import { RegistrationPage } from './../registration/registration';
import { Component } from '@angular/core';
import { NavController, App, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  settings: string = '';

  registar_next_page: any = RegistrationPage;
  registar_status: any;

  name: string;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public app: App,
    public data: DataProvider
    ) {
      this.name = data.getUserNamefromStorage();
  }

  ionViewDidEnter() {
    this.settings = '';
  }

  getRegistrationStatus() {
    let loader = this.presentLoading('جاري تفحص حالة التسجيل');
    this.data.getRegistrationForm().subscribe(
      (res: any) => {
        loader.dismiss();
        this.registar_status = res.data;
        if (res.data == null) {
          this.registar_next_page = RegistrationPage;
        } else {
          this.registar_next_page = RegistrationStatusPage;
        }
        this.openRegistration();
      },
      (error) => {
        loader.dismiss();
      }
    )
  }

  openRegistration() {
    this.navCtrl.push(this.registar_next_page, { "status": this.registar_status },
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

  openArticles() {
    this.navCtrl.push(ArticlesPage, {},
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

  openAds() {
    this.navCtrl.push(AdvertisementsPage, {},
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

  openObjections() {
    this.navCtrl.push(ContactPage, {},
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

  openStudentYearsInfo() {
    this.navCtrl.push(StudentYearsInfoPage, {},
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

  selectSettings() {
    if (this.settings == "logout") {
      this.logout();
    }
    if (this.settings == "about") {
      this.openAbout();
    }
  }

  logout() {
    this.data.removeUserFromLocalStorage();
    this.app.getRootNav().setRoot(LoginPage, {},
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

  openAbout() {
    this.navCtrl.push(AboutPage, {},
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

  presentLoading(text) {
    const loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: text,
      cssClass: "loaderCss"
    });
    loader.present();
    return loader;
  }
}
