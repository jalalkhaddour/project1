import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {
  }

  ionViewDidLoad() {
    this.nextPage();
  }

  nextPage() {

    let next;

    if (this.data.isLoggedIn()) {
      next = HomePage;
      this.data.setHeaderAuthorization();
      console.log(this.data.getTokenfromStorage());
    } else {
      next = LoginPage;
    }

    setTimeout(() => {
      this.navCtrl.setRoot(next, {},
        {
          animate: true,
          animation: 'ios-transition',
          easing: "out",
          duration: 350
        })
    }, 1500);

  }



}
